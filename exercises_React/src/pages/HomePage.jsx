import { useNavigate } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

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

  const handleEdit = (exercise) => {
    navigate(`/edit-exercise/${exercise._id}`, { state: { exercise } });
  };


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
    <div className="app">
      <ExerciseCollection exercises={exercises} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default HomePage;
