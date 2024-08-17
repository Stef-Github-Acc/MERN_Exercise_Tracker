import ExerciseRow from './ExerciseRow';
import PropTypes from 'prop-types';

const ExerciseTable = ({ exercises, onEdit, onDelete }) => {
  return (
    <table className="exercise-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map(exercise => (
          <ExerciseRow
            key={exercise._id}
            exercise={exercise}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

ExerciseTable.propTypes = {
  exercises: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExerciseTable;
