import React, {useState, useMemo, useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Stack } from "@mui/material";
import axios from 'axios'


const defaultTheme = createTheme();

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="localhost:3000">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default function Register() {
    const [checked, setChecked] = useState([0]);
    const [ingredients, setIngredients] = useState([0]);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
      axios.get('https://q928ansqm2.execute-api.ca-central-1.amazonaws.com/getIngredients')
      .then((data) => {
        setIngredients(data['data'].slice(1, ))
      })}, []);


    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    const filterIngredient = (e) => {
      setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://q928ansqm2.execute-api.ca-central-1.amazonaws.com/handleUser',{
        'name' : e.target.name.value,
        'phone' : e.target.phone.value,
        'allergies' : checked,
      })
      .then((data) => {
        console.log(data['data'])
        //setMessage(message);
      })
      .catch((error) => {
        //console.log(error);
      })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <Box
                    sx={{
                        display : 'flex',
                        flexDirection : 'row', 
                        alignItems : 'row'
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <RestaurantIcon />
                    </Avatar>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <NotificationImportantIcon />
                    </Avatar>
                </Box>
              <Typography component="h1" variant="h5">
                Register Today!
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number (10 Digits, CANADA/USA Only)"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="First Name (Name to display)"
                  type="name"
                  id="name"
                  autoComplete="name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="time"
                  label="Notification Hour"
                  type="time"
                  id="time"
                  autoComplete="time"
                />
                <label>
                    Allergies / Ingredients
                </label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ingredient"
                  label="Ingredient"
                  name="ingredient"
                  autoComplete="ingredient"
                  autoFocus
                  onChange={filterIngredient}
                />                
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {ingredients.filter((ingredient) => {return checked.indexOf(ingredient) !== -1})
                  .map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem
                      key={value}
                      disablePadding
                      >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                      <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                      />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                      </ListItemButton>
                  </ListItem>
                  )
                  })}
                  {ingredients.filter((ingredient) => {return (checked.indexOf(ingredient) === -1 && ingredient.includes(search.toLowerCase()))})
                  .slice(0, 10)
                  .map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem
                      key={value}
                      disablePadding
                      >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                      <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                      />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                      </ListItemButton>
                  </ListItem>
                  )
                  })}                
            </List>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
    }