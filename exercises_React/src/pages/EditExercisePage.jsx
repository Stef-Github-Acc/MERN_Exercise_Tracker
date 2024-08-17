import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './EditExercisePage.css';

const EditExercisePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(state?.exercise || {});

  useEffect(() => {
    if (!state?.exercise) {
      navigate('/');
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExercise(prev => ({
      ...prev,
      [name]: name === 'reps' || name === 'weight' ? parseInt(value, 10) : value
    }));
  };

  const isNameValid = (name) => {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exercise.name || !isNameValid(exercise.name) || exercise.reps <= 0 || exercise.weight <= 0 || !exercise.unit || !exercise.date) {
      alert('Name cannot have symbols or numbers, Reps and Weight must be positive integers, and Date must be in valid format.');
      setTimeout(() => navigate('/'), 0);
      return;
    }

    try {
      const response = await fetch(`/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
      });

      if (response.status === 200) {
        alert('Exercise updated successfully');
        setTimeout(() => navigate('/'), 0);
      } else {
        const error = await response.json();
        alert(`Failed to update exercise: ${error.Error}`);
        setTimeout(() => navigate('/'), 0);
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
      alert('An unexpected error occurred while updating the exercise.');
      setTimeout(() => navigate('/'), 0);
    }
  };

  return (
    <div className="edit-exercise-page">
      <h1>Edit Exercise</h1>
      <form onSubmit={handleSubmit}>
        <table className="edit-exercise-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Unit</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  value={exercise.name || ''}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="reps"
                  value={exercise.reps || ''}
                  onChange={handleChange}
                  placeholder="Reps"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="weight"
                  value={exercise.weight || ''}
                  onChange={handleChange}
                  placeholder="Weight"
                  required
                />
              </td>
              <td>
                <select
                  name="unit"
                  value={exercise.unit || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select unit</option>
                  <option value="kgs">kgs</option>
                  <option value="lbs">lbs</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="date"
                  value={exercise.date || ''}
                  onChange={handleChange}
                  placeholder="Date (MM-DD-YY)"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="submit-button">Update Exercise</button>
      </form>
    </div>
  );
};

export default EditExercisePage;
