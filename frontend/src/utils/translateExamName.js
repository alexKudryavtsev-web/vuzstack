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
    case 'GEOGRAPHY':
      return 'География';
    default:
      return null;
  }
}

function translateExamToShortName(exam) {
  switch (exam) {
    case 'RUSSIAN_LANGUAGE':
      return 'русский';
    case 'MATH':
      return 'мат.';
    case 'PHYSIC':
      return 'физика';
    case 'CHEMISTRY':
      return 'химия';
    case 'HISTORY':
      return 'история';
    case 'SOCIAL_SCIENCE':
      return 'общ.';
    case 'COMPUTER_SCIENCE':
      return 'инф.';
    case 'BIOLOGY':
      return 'био.';
    case 'FOREIGN_LANGUAGE':
      return 'иностранный';
    case 'GEOGRAPHY':
      return 'гео.';
    default:
      return null;
  }
}

export default translateExamName;
export { translateExamToShortName };
