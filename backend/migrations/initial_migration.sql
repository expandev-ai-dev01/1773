-- =====================================================
-- Database Migration: Initial Schema Setup
-- =====================================================
-- This file sets up the required schemas for the application.
-- Feature-specific tables will be added in subsequent migrations.
-- =====================================================

-- Create schema [project_1773] (idempotent)
-- The deployment service will automatically replace [project_1773] with the project-specific schema name.
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
-- Placeholder for future tables
-- =====================================================
-- Example:
-- IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'books' AND schema_id = SCHEMA_ID('dbo'))
-- BEGIN
--     CREATE TABLE [project_1773].[books] (
--         [id] INT IDENTITY(1,1) PRIMARY KEY,
--         [title] NVARCHAR(255) NOT NULL,
--         [author] NVARCHAR(255) NOT NULL
--     );
--     PRINT 'Table [project_1773].[books] created successfully.'
-- END
-- GO
-- =====================================================
