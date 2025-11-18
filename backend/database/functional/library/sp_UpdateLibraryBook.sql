CREATE OR ALTER PROCEDURE [dbo].[sp_UpdateLibraryBook]
    @userId INT,
    @libraryBookId INT,
    @shelf_status TINYINT = NULL,
    @rating DECIMAL(3,1) = NULL,
    @review NVARCHAR(MAX) = NULL,
    @current_page INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @pageCount INT;
    DECLARE @currentShelfStatus TINYINT;

    SELECT @pageCount = b.page_count, @currentShelfStatus = ul.shelf_status
    FROM dbo.user_library ul
    JOIN dbo.books b ON ul.book_id = b.id
    WHERE ul.id = @libraryBookId AND ul.user_id = @userId;

    IF @pageCount IS NULL
    BEGIN
        RETURN -1; -- Not found
    END

    IF @current_page IS NOT NULL AND (@current_page < 0 OR @current_page > @pageCount)
    BEGIN
        RETURN -2; -- Invalid page number
    END

    UPDATE dbo.user_library
    SET
        shelf_status = ISNULL(@shelf_status, shelf_status),
        rating = ISNULL(@rating, rating),
        review = ISNULL(@review, review),
        current_page = ISNULL(@current_page, current_page),
        -- Set start date when moving to 'Reading' for the first time
        date_started = CASE
            WHEN @shelf_status = 1 AND @currentShelfStatus != 1 THEN GETUTCDATE()
            ELSE date_started
        END,
        -- Set finish date when moving to 'Read'
        date_finished = CASE
            WHEN @shelf_status = 2 AND @currentShelfStatus != 2 THEN GETUTCDATE()
            ELSE date_finished
        END
    WHERE id = @libraryBookId AND user_id = @userId;

    -- Return the updated record
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

END;
GO
