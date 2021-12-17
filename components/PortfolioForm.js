import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';

const PortfolioForm = ({ onSubmit, portfolio = {} }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showEndDate, setShowEndDate] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: portfolio,
  });

  useEffect(() => {
    register({ name: 'startDate' });
    register({ name: 'endDate' });
  }, [register]);

  useEffect(() => {
    const { startDate, endDate } = portfolio;
    if (startDate) setStartDate(new Date(startDate));
    if (endDate) setStartDate(new Date(endDate));
  }, [portfolio]);

  const handleDateChange = (key, setter) => date => {
    setter(date);
    setValue(key, date);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          ref={register}
          name='title'
          type='text'
          className='form-control'
          id='title'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='city'>Company</label>
        <input
          ref={register}
          name='company'
          type='text'
          className='form-control'
          id='company'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='city'>Company Website</label>
        <input
          ref={register}
          name='companyWebsite'
          type='text'
          className='form-control'
          id='companyWebsite'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='street'>Location</label>
        <input
          ref={register}
          name='location'
          type='text'
          className='form-control'
          id='location'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='street'>Job Title</label>
        <input
          ref={register}
          name='jobTitle'
          type='text'
          className='form-control'
          id='jobTitle'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          ref={register}
          name='description'
          rows='5'
          type='text'
          className='form-control'
          id='description'
        ></textarea>
      </div>

      <div className='form-group'>
        <label htmlFor='startDate'>Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleDateChange('startDate', setStartDate)}
          />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='endDate'>End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={endDate}
            onChange={handleDateChange('endDate', setEndDate)}
            disabled={!showEndDate}
          />
        </div>
      </div>
      <div className='form-group'>
        {!showEndDate ? (
          <button
            type='button'
            className='btn btn-success '
            onClick={() => setShowEndDate(true)}
          >
            Set end date
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => {
              setShowEndDate(false);
              handleDateChange('endDate', setEndDate)(undefined);
            }}
          >
            No end date
          </button>
        )}
      </div>
      <button type='submit' className='btn btn-primary'>
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;
