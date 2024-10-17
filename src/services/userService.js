import jsonwebtoken from "jsonwebtoken";
import prisma from "../db/db.js";
import { comparePasswords } from "../utils/comparePasswords.js";
import { hashPassword } from "../utils/hashPassword.js";
import { constants } from "../utils/constants.js";
import { validateUser } from "../utils/validations.js";

export const createUser = async (data) => {
  const validation = validateUser(data);

  if (!validation.isValid) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: validation.message,
    };
  }

  const { email, password, role } = data;

  if (!email || !password || !role) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields (email, password, and role) are required.",
    };
  }
  const hashedPassword = await hashPassword(password);
  const normalizedRole = role.toUpperCase();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Email already exists",
    };
  }

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, role: normalizedRole },
  });

  if (normalizedRole === "TEACHER") {
    await prisma.teacher.create({
      data: {
        user_id: newUser.id,
      },
    });
  } else if (normalizedRole === "STUDENT") {
    await prisma.student.create({
      data: {
        user_id: newUser.id,
      },
    });
  }
  return {
    type: "Success",
    statusCode: 201,
    message: "User created successfully",
    user: newUser,
  };
};

export const login = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields (email, password) are required.",
    };
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "User not found.",
    };
  }
  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Invalid credentials.",
    };
  }

  const accessToken = jsonwebtoken.sign(
    { user: { id: user.id, email: user.email, role: user.role } },

    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return {
    type: "Success",
    statusCode: 200,
    user: user,
    message: "Login successful",
    accessToken,
  };
};

export const createDepartment = async (data) => {
  const { department_name } = data;

  if (!department_name) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Department name is required",
    };
  }

  const newDepartment = await prisma.department.create({
    data: { department_name },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Department created successfully",
    department: newDepartment,
  };
};

export const createBatch = async (data) => {
  const { batch_year } = data;

  if (!batch_year) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Batch year is required",
    };
  }

  const newBatch = await prisma.batch.create({
    data: { batch_year },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Batch created successfully",
    batch: newBatch,
  };
};

export const createDepartmentBatch = async (data) => {
  const { department_id, batch_id } = data;

  if (!department_id || !batch_id) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }

  const newDeptBatch = await prisma.department_Batch.create({
    data: { department_id, batch_id },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Department Batch created successfully",
    deptBatch: newDeptBatch,
  };
};

export const createCourse = async (data) => {
  const { course_name, course_code, credit_hours, dept_id } = data;

  if (!course_name || !course_code || !credit_hours || !dept_id) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }

  const newCourse = await prisma.course.create({
    data: { course_name, course_code, credit_hours, dept_id },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Semester created successfully",
    course: newCourse,
  };
};

export const createSemester = async (data) => {
  const { semester_name, start_date, end_date } = data;

  if (!semester_name || !start_date || !end_date) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }

  const newSemester = await prisma.semester.create({
    data: { semester_name, start_date, end_date },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Semester created successfully",
    semester: newSemester,
  };
};
export const createSection = async (data) => {
  const { section_name, dept_batch_id } = data;

  if (!section_name || !dept_batch_id) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }

  const newSection = await prisma.section.create({
    data: { section_name, dept_batch_id },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Section created successfully",
    semester: newSection,
  };
};

export const assignDepartmentBatch = async (data) => {
  const { department_id, batch_id } = data;

  if (!department_id || !batch_id) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }

  const departmentBatch = await prisma.department_Batch.create({
    data: { department_id, batch_id },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Course assigned to teacher successfully",
    departmentBatch,
  };
};

export const enrollStudentInCourse = async (data) => {
  const { course_id, student_id, semester_id, enrollment_date } = data;

  if (!course_id || !student_id || !semester_id || !enrollment_date) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }

  const existingEnrollment = await prisma.enrollment.findFirst({
    where: { student_id, course_id, semester_id },
  });

  if (existingEnrollment) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Student is already enrolled in this course",
    };
  }
  const course = await prisma.course.findUnique({
    where: { id: course_id },
    select: { credit_hours: true },
  });

  if (!course) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Course not found",
    };
  }

  const totalStudentCredits = await prisma.enrollment.findMany({
    where: { student_id, semester_id },
    include: {
      course: true,
    },
  });

  let totalCredits = 0;

  totalStudentCredits.forEach((c) => {
    totalCredits += c.course.credit_hours;
  });

  if (totalCredits + course.credit_hours > 16) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "Student has reached the maximum credit hours for the semester",
    };
  }

  const newEnrollment = await prisma.enrollment.create({
    data: { student_id, course_id, semester_id, enrollment_date },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Student enrolled successfully in the course",
    enrollment: newEnrollment,
  };
};

export const assignGrade = async (data) => {
  const { student_id, course_id, semester_id, grade } = data;

  if (!student_id || !course_id || !semester_id || !grade) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }
  const createGrade = await prisma.grade.create({
    data: { student_id, course_id, semester_id, grade },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Grade assigned successfully",
    grade: createGrade,
  };
};

export const assignCourseToTeacher = async (data) => {
  const { teacher_id, course_id } = data;

  if (!teacher_id || !course_id) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "All fields are required",
    };
  }

  const courseTeacher = await prisma.teacher_Course.create({
    data: { teacher_id, course_id },
  });

  return {
    type: "Success",
    statusCode: 201,
    message: "Course assigned to teacher successfully",
    courseTeacher,
  };
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  if (!users) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    users,
  };
};

export const getAllTeachers = async () => {
  const teachers = await prisma.teacher.findMany();
  if (!teachers) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    teachers,
  };
};

export const getAllAdmins = async () => {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
  });
  if (!admins) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    admins,
  };
};

export const getAllStudents = async () => {
  const students = await prisma.student.findMany();
  if (!students) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    students,
  };
};

export const getAllDepartments = async () => {
  const departments = await prisma.department.findMany();
  if (!departments) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    departments,
  };
};

export const getAllCourses = async () => {
  const courses = await prisma.course.findMany();
  if (!courses) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    courses,
  };
};

export const getDepartmentById = async (deptId) => {
  const id = parseInt(deptId, 10);

  const department = await prisma.department.findUnique({
    where: { id },
    include: {
      teachers: true,
      courses: true,
      students: true,
    },
  });
  if (!department) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    department,
  };
};
export const getCoursetById = async (courseId) => {
  const id = parseInt(courseId, 10);

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      department: true,
      teacher_courses: {
        include: {
          teacher: true,
        },
      },
      enrollments: {
        include: {
          student: true,
          semester: true,
        },
      },
    },
  });
  if (!course) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    course,
  };
};

export const getTeacherById = async (teacherId) => {
  const id = parseInt(teacherId, 10);

  const teacher = await prisma.teacher.findUnique({
    where: { id },
    include: {
      department: true,
      teacher_courses: {
        include: {
          course: true,
        },
      },
      user: true,
    },
  });
  if (!teacher) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    teacher,
  };
};

export const getStudentById = async (studentId) => {
  const id = parseInt(studentId, 10);

  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      department: true,
      batch: true,
      section: true,
      user: true,
      enrollments: {
        include: {
          course: true,
          semester: true,
        },
      },
    },
  });
  if (!student) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    student,
  };
};

export const updateStudent = async ({ id, data }) => {
  const studentId = parseInt(id, 10);
  if (!studentId) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "ID is required",
    };
  }
  const student = await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      ...data,
    },
  });

  if (!student) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    student,
  };
};
export const updateTeacher = async ({ id, data }) => {
  const teacherId = parseInt(id, 10);
  if (!teacherId) {
    return {
      type: "Error",
      statusCode: constants.VALIDATION_ERROR,
      message: "ID is required",
    };
  }
  const teacher = await prisma.teacher.update({
    where: {
      id: teacherId,
    },
    data: {
      ...data,
    },
  });

  if (!teacher) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Not found",
    };
  }
  return {
    type: "Success",
    statusCode: 200,
    teacher,
  };
};

export const deleteAUser = async (id) => {
  const userId = parseInt(id, 10);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "User not found",
    };
  }

  if (user.role === "STUDENT") {
    await deleteStudent(userId);
  } else if (user.role === "TEACHER") {
    await deleteTeacher(userId);
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return {
    type: "Success",
    statusCode: 200,
    message: "User deleted successfully",
    user,
  };
};

export const deleteTeacher = async (id) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      user_id: id,
    },
  });

  if (!teacher) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Teacher not found",
    };
  }

  await prisma.teacher_Course.deleteMany({
    where: {
      teacher_id: teacher.id,
    },
  });

  await prisma.teacher.delete({
    where: {
      id: teacher.id,
    },
  });

  return {
    type: "Success",
    statusCode: 200,
    message: "Teacher and related courses deleted successfully",
    teacher,
  };
};

export const deleteStudent = async (id) => {
  const student = await prisma.student.findUnique({
    where: {
      user_id: id,
    },
  });
  console.log("st id", student.id);
  if (!student) {
    return {
      type: "Error",
      statusCode: constants.NOT_FOUND,
      message: "Teacher not found",
    };
  }

  await prisma.enrollment.deleteMany({
    where: {
      student_id: student.id,
    },
  });

  await prisma.grade.deleteMany({
    where: {
      student_id: student.id,
    },
  });
  await prisma.student.delete({
    where: {
      id: student.id,
    },
  });
  return {
    type: "Success",
    statusCode: 200,
    message: "Student and related data deleted successfully",
    student,
  };
};
