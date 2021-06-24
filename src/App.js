import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/app'
import fire from './fire'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    alignItems: 'center',
    justify: 'center'
  }
}))
function App() {
  const [errMsg, setErrMsg] = useState('')
  const increment = firebase.firestore.FieldValue.increment(1)
  const decrement = firebase.firestore.FieldValue.increment(-1)
  const [amount, setAmount] = useState('')
  const [currSkate, setCurrSkate] = useState('')
  const db = firebase.firestore()
  const classes = useStyles();
  const [skate, setSkate] = useState([])
  const handleCheckAvailabilityTue = () => {
    skate.map((each) => {
      if (each.id === currSkate) {
        setAmount(each.AmountTue)
      }
    }
    )
  }
  const handleCheckAvailabilityWed = () => {
    skate.map((each) => {
      if (each.id === currSkate) {
        setAmount(each.AmountWed)
      }
    }
    )
  }
  const handleCheckInTuesday = () => {
    db.collection('skateRentals').doc(currSkate).update({
      AmountTue: increment
    })
  }
  const handleCheckInWednesday = () => {
    db.collection('skateRentals').doc(currSkate).update({
      AmountWed: increment
    })
  }
  const handleCheckOutTuesday = () => {
    skate.map((each) => {
      if (each.id === currSkate) {
        if(each.AmountTue > 0) {
          db.collection('skateRentals').doc(currSkate).update({
            AmountTue: decrement
          })
          setErrMsg('Checked out Successfully')
        } else {
          setErrMsg('Skates not available')
        }
      }
    })
    
  }
  const handleCheckOutWednesday = () => {
    skate.map((each) => {
      if (each.id === currSkate) {
          if(each.AmountWed > 0) {
            db.collection('skateRentals').doc(currSkate).update({
              AmountWed: decrement
            })
            setErrMsg('Checked out Successfully')
          } else {
            setErrMsg('Skates not available')
          }
        }
      })
  }

  useEffect(() => {
    if (db) {
      const unsubscribe = db
      .collection('skateRentals')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSkate(data);
      })
      return unsubscribe
    }
  },[db])
  

  return (
    
    <div className="App">
    
    {skate.map((each) => {
      return (<FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" >
          <FormControlLabel onClick = {() => setCurrSkate(each.id)} value="others" control={<Radio />} label={each.id} />
      </RadioGroup>
  </FormControl>
  )

    })}
    <Button  className = {classes.button} variant = 'contained' color = 'primary' onClick = {() => {handleCheckAvailabilityTue()}}>Check availability tuesday</Button>
    <Button className = {classes.button} variant = 'contained' color = 'primary' onClick = {() => {handleCheckAvailabilityWed()}}>Check availability wednesday</Button>
    {amount}
    <Button className = {classes.button} variant = 'contained' color = 'primary' onClick = {() => {handleCheckOutTuesday()}}>Check out tuesday</Button>
    <Button className = {classes.button} variant = 'contained' color = 'primary' onClick = {() => {handleCheckOutWednesday()}}>Check out wednesday</Button>
    <Button className = {classes.button} variant = 'contained' color = 'primary' onClick = {() => {handleCheckInTuesday()}}>Check in tuesday</Button>
    <Button className = {classes.button} variant = 'contained' color = 'primary' onClick = {() => {handleCheckInWednesday()}}>Check in wednesday</Button>
    {amount}
    <h4 className = 'errMsg'>{errMsg}</h4>
    </div>
  );
}

export default App;
