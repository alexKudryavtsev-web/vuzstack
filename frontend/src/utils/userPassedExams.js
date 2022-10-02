function userPassedExams(userMarks, direction) {
  let requiredExamsPassed = true;

  for (const exam of direction.requiredExams) {
    if (!userMarks.find((mark) => mark.exam === exam)) {
      requiredExamsPassed = false;
    }
  }

  let optionalExamPassed = false;

  for (const exam of direction.optionalExams) {
    if (userMarks.find((mark) => mark.exam === exam)) {
      optionalExamPassed = true;
    }
  }

  return requiredExamsPassed && optionalExamPassed;
}

export default userPassedExams;
