import PropTypes from 'prop-types';
import { useState } from 'react';
import { NeoButton } from '../ui/NeoButton';

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-bg-surface1 px-3 py-2 text-sm text-text-primary outline-none focus:border-white/25';

export function TaskForm({ userId, selectedDate, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'DAILY',
    startDate: selectedDate,
    endDate: selectedDate,
    colorCategory: 'default'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      userId,
      status: 'PENDING'
    });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input className={inputClass} placeholder="Task title" name="title" value={form.title} onChange={handleChange} required />
      <textarea className={inputClass} placeholder="Description" name="description" value={form.description} onChange={handleChange} rows={3} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <select className={inputClass} name="type" value={form.type} onChange={handleChange}>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
        <input className={inputClass} name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
        <input className={inputClass} name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
      </div>
      <div className="flex justify-end">
        <NeoButton type="submit" disabled={loading} className="bg-bg-surface1">
          {loading ? 'Saving...' : 'Create Task'}
        </NeoButton>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  userId: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
