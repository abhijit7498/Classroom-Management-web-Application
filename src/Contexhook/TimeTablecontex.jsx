import { createContext,useState } from "react";

export const Timetablecontext=createContext();

export const Timetableprovider=({children})=>{
    const [timetable, setTimetable] = useState(null);

    return(
<Timetablecontext.Provider value={{timetable,setTimetable}}>
    {children}
    </Timetablecontext.Provider>
    )

}