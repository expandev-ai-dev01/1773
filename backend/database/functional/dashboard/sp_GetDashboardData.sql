CREATE OR ALTER PROCEDURE [dbo].[sp_GetDashboardData]
    @userId INT,
    @year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Goal Progress
    SELECT
        ISNULL(COUNT(ul.id), 0) AS booksRead,
        ISNULL((SELECT TOP 1 rg.book_count_goal FROM dbo.reading_goals rg WHERE rg.user_id = @userId AND rg.year = @year), 0) AS goal
    FROM dbo.user_library ul
    WHERE ul.user_id = @userId
      AND ul.shelf_status = 2 -- Read
      AND YEAR(ul.date_finished) = @year;

    -- 2. Currently Reading
    SELECT
        ul.id AS libraryBookId,
        b.title,
        b.author,
        b.cover_image_url AS coverImageUrl,
        ul.current_page AS currentPage,
        b.page_count AS pageCount
    FROM dbo.user_library ul
    JOIN dbo.books b ON ul.book_id = b.id
    WHERE ul.user_id = @userId AND ul.shelf_status = 1; -- Reading

    -- 3. General Statistics (Total Pages, Favorite Genre)
    SELECT
        ISNULL(SUM(b.page_count), 0) AS totalPagesRead,
        (SELECT TOP 1 b_genre.genre
         FROM dbo.user_library ul_genre
         JOIN dbo.books b_genre ON ul_genre.book_id = b_genre.id
         WHERE ul_genre.user_id = @userId
           AND ul_genre.shelf_status = 2
           AND YEAR(ul_genre.date_finished) = @year
           AND b_genre.genre IS NOT NULL
         GROUP BY b_genre.genre
         ORDER BY COUNT(b_genre.genre) DESC, b_genre.genre ASC) AS favoriteGenre
    FROM dbo.user_library ul
    JOIN dbo.books b ON ul.book_id = b.id
    WHERE ul.user_id = @userId
      AND ul.shelf_status = 2
      AND YEAR(ul.date_finished) = @year;

    -- 4. Monthly Completions
    WITH Months AS (
        SELECT 1 AS month_num UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
        SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
        SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
        SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
    )
    SELECT
        m.month_num AS month,
        ISNULL(COUNT(ul.id), 0) AS booksRead
    FROM Months m
    LEFT JOIN dbo.user_library ul ON m.month_num = MONTH(ul.date_finished)
        AND ul.user_id = @userId
        AND ul.shelf_status = 2
        AND YEAR(ul.date_finished) = @year
    GROUP BY m.month_num
    ORDER BY m.month_num;

END;
GO
