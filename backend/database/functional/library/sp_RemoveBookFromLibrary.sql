CREATE OR ALTER PROCEDURE [dbo].[sp_RemoveBookFromLibrary]
    @userId INT,
    @libraryBookId INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.user_library WHERE id = @libraryBookId AND user_id = @userId)
    BEGIN
        RETURN -1; -- Not found
    END

    DELETE FROM dbo.user_library
    WHERE id = @libraryBookId AND user_id = @userId;

    RETURN 0;
END;
GO
