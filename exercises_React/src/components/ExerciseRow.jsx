import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ExerciseRow = ({ exercise, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <FaEdit
          onClick={() => onEdit(exercise)}
          className="icon edit-icon"
          title="Edit"
        />
        <FaTrashAlt
          onClick={() => onDelete(exercise._id)}
          className="icon delete-icon"
          title="Delete"
        />
      </td>
    </tr>
  );
};

ExerciseRow.propTypes = {
  exercise: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExerciseRow;
