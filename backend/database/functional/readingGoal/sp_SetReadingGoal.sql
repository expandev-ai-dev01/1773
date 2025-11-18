CREATE OR ALTER PROCEDURE [dbo].[sp_SetReadingGoal]
    @userId INT,
    @year INT,
    @bookCountGoal INT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM dbo.reading_goals WHERE user_id = @userId AND year = @year)
    BEGIN
        UPDATE dbo.reading_goals
        SET
            book_count_goal = @bookCountGoal,
            updated_at = GETUTCDATE()
        WHERE user_id = @userId AND year = @year;
    END
    ELSE
    BEGIN
        INSERT INTO dbo.reading_goals (user_id, year, book_count_goal)
        VALUES (@userId, @year, @bookCountGoal);
    END

    -- Return the created/updated goal
    SELECT * FROM dbo.reading_goals WHERE user_id = @userId AND year = @year;

END;
GO
