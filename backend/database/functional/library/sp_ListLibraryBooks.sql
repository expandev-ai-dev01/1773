CREATE OR ALTER PROCEDURE [dbo].[sp_ListLibraryBooks]
    @userId INT,
    @shelfStatus TINYINT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        ul.id AS libraryBookId,
        b.id AS id,
        b.title,
        b.author,
        b.isbn,
        b.publisher,
        b.publication_year,
        b.page_count,
        b.genre,
        b.cover_image_url,
        ul.shelf_status,
        ul.rating,
        ul.review,
        ul.date_added,
        ul.date_started,
        ul.date_finished,
        ul.current_page
    FROM dbo.user_library ul
    JOIN dbo.books b ON ul.book_id = b.id
    WHERE ul.user_id = @userId
      AND (@shelfStatus IS NULL OR ul.shelf_status = @shelfStatus)
    ORDER BY ul.date_added DESC;

END;
GO
