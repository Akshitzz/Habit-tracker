import { create } from "zustand";
import { devtools } from "zustand/middleware";
export interface Habit {
    id :string,
    name:string,
    frequency : "daily" |"weekly",
    completedDates : string[],
    createdAt :string,
}

interface HabitStore {
    habits :Habit[],
    isLoading :boolean,
    error :string |null,
    addHabit :(name :string , frequency:"daily" |"weekly") => void;
    removeHabit :(id:string)=>void;
    toggleHabit:(id:string,date:string)=>void;

    fetchhabits:()=>Promise<void>;
}


const useHabitStore = create<HabitStore>()(
devtools(
    (set)=>({
            habits:[],
            isLoading:false,
            error:null,
            addHabit:(name,frequency) =>
                set((state)=>({
                    habits : [
                        ...state.habits,
                        {
                           id:  Date.now().toString(),
                           name,
                           frequency,
                           completedDates : [],
                           createdAt : new Date().toISOString(), 
                        }
                    ]
                })),
                removeHabit:(id)=>
                    set((state)=>({
                        habits:state.habits.filter((habit=>habit.id !== id)),
                    })),
                    toggleHabit : (id,date) => 
                        set((state)=>({
                            habits:state.habits.map((habit)=>
                            habit.id === id ?
                            {
                                ...habit,
                                completedDates :habit.completedDates.includes(date) ? habit.completedDates.filter((d)=>d !== date): [...habit.completedDates,date]
                            }: habit
                            ),
                        })),
                        fetchhabits :async ()=>{
                            set({isLoading:true});
                            try {
                            // Check if we already have habits in the store
                            await new Promise((resolve)=>setTimeout(resolve,1000));
                           const mockHabits :Habit[]=[
                            {
                                id :"1",
                                name:"Read",
                                frequency:"daily",
                                completedDates:[],
                                createdAt: new Date().toISOString(),

                            },
                            {
                                id :"2",
                                name:"Excercise",
                                frequency:"daily",
                                completedDates:[],
                                createdAt: new Date().toISOString(),

                            },
                           ];
                           set({habits:mockHabits,isLoading:false});
                            } catch(error){
                                console.log(error)
                                set({error:"Failed to fetch habits",isLoading:false})
                            }
                           
                        }

    })
)
)

export default useHabitStore;