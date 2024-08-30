import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: 400,
    margin: 'auto',
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f9f9f9',
  },
  formControl: {
    minWidth: 120,
  },
  button: {
    alignSelf: 'center',
  },
}));

const LeaveComponent = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Employee Name"
        name="employeeName"
        value={formData.employeeName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Employee ID"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        required
      />
      <FormControl required className={classes.formControl}>
        <InputLabel>Leave Type</InputLabel>
        <Select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
        >
          <MenuItem value="sick">Sick Leave</MenuItem>
          <MenuItem value="casual">Casual Leave</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Start Date"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="End Date"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Reason"
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
    </form>
  );
};

export default LeaveComponent;
