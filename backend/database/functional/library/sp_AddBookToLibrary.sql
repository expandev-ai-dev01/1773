CREATE OR ALTER PROCEDURE [dbo].[sp_AddBookToLibrary]
    @userId INT,
    @title NVARCHAR(255),
    @author NVARCHAR(255),
    @page_count INT,
    @isbn VARCHAR(20) = NULL,
    @publisher NVARCHAR(100) = NULL,
    @publication_year INT = NULL,
    @genre NVARCHAR(100) = NULL,
    @cover_image_url NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @bookId INT;

    -- Check if the book already exists in the user's library
    IF EXISTS (
        SELECT 1
        FROM dbo.user_library ul
        JOIN dbo.books b ON ul.book_id = b.id
        WHERE ul.user_id = @userId
          AND b.title = @title
          AND b.author = @author
    )
    BEGIN
        -- Book already exists for this user
        RETURN -1;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Find or create the book in the canonical books table
        SELECT @bookId = id FROM dbo.books WHERE title = @title AND author = @author;

        IF @bookId IS NULL
        BEGIN
            INSERT INTO dbo.books (title, author, page_count, isbn, publisher, publication_year, genre, cover_image_url)
            VALUES (@title, @author, @page_count, @isbn, @publisher, @publication_year, @genre, @cover_image_url);
            SET @bookId = SCOPE_IDENTITY();
        END

        -- Add the book to the user's library
        INSERT INTO dbo.user_library (user_id, book_id, shelf_status)
        VALUES (@userId, @bookId, 0); -- Default to 'Want to Read'

        DECLARE @libraryBookId INT = SCOPE_IDENTITY();

        COMMIT TRANSACTION;

        -- Return the newly created library entry
        SELECT
            ul.id AS libraryBookId,
            b.*,
            ul.shelf_status,
            ul.rating,
            ul.review,
            ul.date_added,
            ul.date_started,
            ul.date_finished,
            ul.current_page
        FROM dbo.user_library ul
        JOIN dbo.books b ON ul.book_id = b.id
        WHERE ul.id = @libraryBookId;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO
