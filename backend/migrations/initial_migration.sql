-- =====================================================
-- Database Migration: Initial Schema Setup
-- =====================================================
-- This file sets up the required schemas for the application.
-- Feature-specific tables will be added in subsequent migrations.
-- =====================================================

-- Create schema [dbo] (idempotent)
-- The deployment service will automatically replace [dbo] with the project-specific schema name.
BEGIN TRY
    EXEC('CREATE SCHEMA [dbo]')
    PRINT 'Schema [dbo] created successfully.'
END TRY
BEGIN CATCH
    IF ERROR_NUMBER() = 271 -- Schema already exists error
    BEGIN
        PRINT 'Schema [dbo] already exists, skipping creation.'
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
--     CREATE TABLE [dbo].[books] (
--         [id] INT IDENTITY(1,1) PRIMARY KEY,
--         [title] NVARCHAR(255) NOT NULL,
--         [author] NVARCHAR(255) NOT NULL
--     );
--     PRINT 'Table [dbo].[books] created successfully.'
-- END
-- GO
-- =====================================================
