const {
    connectDB,
    queryStudents,
    queryCourses,
    queryStudent,
    queryCourse,
    updateStudent,
    deleteStudentPrf,
    clearCourseProfile,
    queryStudentsOlderThan,
    queryStudentsByMajor,
    queryStudentsSortedAndLimited
} = require('./dbOperations');

async function main() {
    try {
        // Step 1: Kết nối database
        await connectDB();

        console.log("\n--- STEP 3: HIỂN THỊ TẤT CẢ DỮ LIỆU ---");
        await queryStudents();
        await queryCourses();

        console.log("\n--- STEP 4: TÌM KIẾM CHI TIẾT (Anna & Database Systems) ---");
        await queryStudent("Anna");
        await queryCourse("Database Systems");

        console.log("\n--- STEP 5: CẬP NHẬT VÀ UPSERT DỮ LIỆU ---");
        // Đổi major của John từ Math sang Statistics
        await updateStudent("John", { major: "Statistics" });
        // Test upsert với Tom (chưa tồn tại)
        await updateStudent("Tom", { age: 23, major: "Biology" });
        
        // Kiểm tra lại danh sách sau khi update/upsert
        await queryStudents();

        console.log("\n--- STEP 6: XÓA DỮ LIỆU ---");
        // Xóa sinh viên Mike
        await deleteStudentPrf("Mike");
        // Xóa tất cả các khóa học
        await clearCourseProfile();

        console.log("\n--- STEP 7: TRUY VẤN NÂNG CAO (ADVANCED QUERYING) ---");
        // 1. Tìm sinh viên lớn hơn 20 tuổi
        await queryStudentsOlderThan(20);
        
        // 2. Tìm sinh viên học ngành "Computer Science"
        await queryStudentsByMajor("Computer Science");

        console.log("\n--- STEP 8: SẮP XẾP VÀ GIỚI HẠN (SORTING & LIMITING) ---");
        // Sắp xếp sinh viên theo tuổi tăng dần và giới hạn 2 kết quả
        await queryStudentsSortedAndLimited(2);

        console.log("\n--- KẾT QUẢ CUỐI CÙNG ---");
        await queryStudents();
        await queryCourses();

        console.log("\nHoàn thành chương trình!");
        process.exit(0);
    } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình thực thi:", error);
        process.exit(1);
    }
}

// Chạy chương trình chính
main();