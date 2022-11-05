import { GiEarthAfricaEurope, GiMaterialsScience, GiPencil } from 'react-icons/gi';
import { TbMathSymbols } from 'react-icons/tb';
import { BiTestTube, BiTimeFive } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import { RiComputerLine } from 'react-icons/ri';
import { FaCat, FaFlagUsa } from 'react-icons/fa';

function getIconForExam(exam) {
  switch (exam) {
    case 'RUSSIAN_LANGUAGE':
      return <GiPencil size={42} />;
    case 'MATH':
      return <TbMathSymbols size={42} />;
    case 'PHYSIC':
      return <GiMaterialsScience size={42} />;
    case 'CHEMISTRY':
      return <BiTestTube size={42} />;
    case 'HISTORY':
      return <BiTimeFive size={42} />;
    case 'SOCIAL_SCIENCE':
      return <IoIosPeople size={42} />;
    case 'COMPUTER_SCIENCE':
      return <RiComputerLine size={42} />;
    case 'BIOLOGY':
      return <FaCat size={42} />;
    case 'FOREIGN_LANGUAGE':
      return <FaFlagUsa size={42} />;
    case 'GEOGRAPHY':
      return <GiEarthAfricaEurope size={42} />;
    default:
      return null;
  }
}

export default getIconForExam;
