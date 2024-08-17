// src/components/ExerciseItem.jsx
import PropTypes from 'prop-types';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ExerciseItem = ({ exercise, onDelete, onEdit }) => {
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

ExerciseItem.propTypes = {
  exercise: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    reps: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default ExerciseItem;
