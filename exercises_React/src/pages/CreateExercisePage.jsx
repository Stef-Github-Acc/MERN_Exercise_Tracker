import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditExercisePage.css';

const CreateExercisePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    reps: '',
    weight: '',
    unit: 'kgs',
    date: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isNameValid = (name) => {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reps = parseInt(formData.reps, 10);
    const weight = parseInt(formData.weight, 10);

    if (!formData.name || !isNameValid(formData.name) || reps <= 0 || weight <= 0 || !formData.unit || !formData.date) {
      alert('Name cannot have symbols or numbers, Reps and Weight must be positive integers, and Date must be in valid format.');
    setTimeout(() => navigate('/'), 0);
      return;
    }

    try {
      const response = await fetch('/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          reps,
          weight,
        }),
      });

      if (response.status === 201) {
        alert('Exercise created successfully!');
        setTimeout(() => navigate('/'), 0);
      } else {
        const error = await response.json();
        alert(`Failed to create exercise: ${error.Error}`);
        setTimeout(() => navigate('/'), 0);
      }
    } catch (err) {
      console.error('Error creating exercise:', err);
      alert('An unexpected error occurred while creating the exercise.');
      setTimeout(() => navigate('/'), 0);
    }
  };

  return (
    <div className="edit-exercise-page">
      <h1>Create Exercise</h1>
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="reps"
                  value={formData.reps}
                  onChange={handleChange}
                  placeholder="Reps"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  required
                />
              </td>
              <td>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="kgs">kgs</option>
                  <option value="lbs">lbs</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Date (MM-DD-YY)"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="submit-button">Save Exercise</button>
      </form>
    </div>
  );
};

export default CreateExercisePage;
