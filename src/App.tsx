import { Container,Box, Typography } from "@mui/material";
import { useEffect } from "react";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import HabitStats from "./components/habit-stats";
import useHabitStore from "./store/store";

const App:React.FC = ()=>{
const {fetchHabits} = useHabitStore();

useEffect(()=>{
  fetchHabits();
},[]);
return (
      <Container maxWidth="md">
          <Box sx={{my:4}}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
              Habit Tracker
            </Typography>
            <AddHabitForm/>
            <HabitList/>
            <HabitStats/>
          </Box>
      </Container>
)

}

export default App;