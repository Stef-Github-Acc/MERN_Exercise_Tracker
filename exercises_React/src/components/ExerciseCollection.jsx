import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExerciseItem from './ExerciseItem';

const ExerciseCollection = ({ onEdit }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/exercises');
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        const response = await fetch(`/exercises/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setExercises(exercises.filter(exercise => exercise._id !== id));
        } else {
          alert('Failed to delete exercise');
        }
      } catch (error) {
        console.error('Error deleting exercise:', error);
      }
    }
  };

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
          <ExerciseItem
            key={exercise._id}
            exercise={exercise}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

ExerciseCollection.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default ExerciseCollection;
