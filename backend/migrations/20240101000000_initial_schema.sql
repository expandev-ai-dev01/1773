-- =====================================================
-- Database Migration: Initial Schema for BookNest
-- =====================================================

-- Create schema (idempotent)
BEGIN TRY
    EXEC('CREATE SCHEMA [project_1773]')
    PRINT 'Schema [project_1773] created successfully.'
END TRY
BEGIN CATCH
    IF ERROR_NUMBER() = 271 -- Schema already exists error
    BEGIN
        PRINT 'Schema [project_1773] already exists, skipping creation.'
    END
    ELSE
    BEGIN
        THROW;
    END
END CATCH
GO

-- =====================================================
-- Table: books
-- Stores canonical book information to avoid duplication.
-- =====================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'books' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE [project_1773].[books] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [title] NVARCHAR(255) NOT NULL,
        [author] NVARCHAR(255) NOT NULL,
        [isbn] VARCHAR(20) NULL,
        [publisher] NVARCHAR(100) NULL,
        [publication_year] INT NULL,
        [page_count] INT NOT NULL,
        [genre] NVARCHAR(100) NULL,
        [cover_image_url] NVARCHAR(500) NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),

        CONSTRAINT [pk_books] PRIMARY KEY CLUSTERED ([id])
    );
    PRINT 'Table [project_1773].[books] created successfully.'
END
GO

-- =====================================================
-- Table: user_library
-- Links users to books and stores their personal reading data.
-- =====================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_library' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE [project_1773].[user_library] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [user_id] INT NOT NULL, -- In a real app, this would be a FK to a users table
        [book_id] INT NOT NULL,
        [shelf_status] TINYINT NOT NULL DEFAULT 0, -- 0: Want to Read, 1: Reading, 2: Read
        [rating] DECIMAL(3,1) NULL,
        [review] NVARCHAR(MAX) NULL,
        [date_added] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [date_started] DATETIME2 NULL,
        [date_finished] DATETIME2 NULL,
        [current_page] INT NOT NULL DEFAULT 0,

        CONSTRAINT [pk_user_library] PRIMARY KEY CLUSTERED ([id]),
        CONSTRAINT [fk_user_library_book] FOREIGN KEY ([book_id]) REFERENCES [project_1773].[books]([id]) ON DELETE CASCADE,
        CONSTRAINT [chk_user_library_shelf_status] CHECK ([shelf_status] IN (0, 1, 2)),
        CONSTRAINT [chk_user_library_rating] CHECK ([rating] IS NULL OR ([rating] >= 1.0 AND [rating] <= 5.0))
    );
    PRINT 'Table [project_1773].[user_library] created successfully.'
END
GO

-- =====================================================
-- Table: reading_goals
-- Stores annual reading goals for each user.
-- =====================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'reading_goals' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE [project_1773].[reading_goals] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [user_id] INT NOT NULL,
        [year] INT NOT NULL,
        [book_count_goal] INT NOT NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        [updated_at] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),

        CONSTRAINT [pk_reading_goals] PRIMARY KEY CLUSTERED ([id]),
        CONSTRAINT [uq_reading_goals_user_year] UNIQUE ([user_id], [year])
    );
    PRINT 'Table [project_1773].[reading_goals] created successfully.'
END
GO

-- =====================================================
-- Indexes for performance
-- =====================================================
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'uq_books_isbn' AND object_id = OBJECT_ID('[project_1773].[books]'))
BEGIN
    CREATE UNIQUE NONCLUSTERED INDEX [uq_books_isbn] ON [project_1773].[books]([isbn]) WHERE [isbn] IS NOT NULL;
    PRINT 'Index [uq_books_isbn] created successfully.'
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_user_library_user_book' AND object_id = OBJECT_ID('[project_1773].[user_library]'))
BEGIN
    CREATE UNIQUE NONCLUSTERED INDEX [idx_user_library_user_book] ON [project_1773].[user_library]([user_id], [book_id]);
    PRINT 'Index [idx_user_library_user_book] created successfully.'
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_user_library_shelf_status' AND object_id = OBJECT_ID('[project_1773].[user_library]'))
BEGIN
    CREATE NONCLUSTERED INDEX [idx_user_library_shelf_status] ON [project_1773].[user_library]([user_id], [shelf_status]);
    PRINT 'Index [idx_user_library_shelf_status] created successfully.'
END
GO
