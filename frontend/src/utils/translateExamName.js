function translateExamName(exam) {
  switch (exam) {
    case 'RUSSIAN_LANGUAGE':
      return 'Русский язык';
    case 'MATH':
      return 'Профильная математика';
    case 'PHYSIC':
      return 'Физика';
    case 'CHEMISTRY':
      return 'Химия';
    case 'HISTORY':
      return 'История';
    case 'SOCIAL_SCIENCE':
      return 'Обществознание';
    case 'COMPUTER_SCIENCE':
      return 'Информатика и ИКТ';
    case 'BIOLOGY':
      return 'Биология';
    case 'FOREIGN_LANGUAGE':
      return 'Иностранный язык';
    default:
      return null;
  }
}

export default translateExamName
