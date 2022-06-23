import { createContext, useEffect, useReducer, useState } from 'react'

import { useRouter } from 'next/router'

export const AppContext = createContext()

const initialState = { messages: [] }

const reducer = (state, action) => {
  try {
    if (action.type == 'clear') return { messages: [] }
    if (action.type == 'add')
      return { messages: [...state.messages, action.data] }
  } catch (error) {
    console.error(error)
  }
}

export const ContextProvider = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'clear', data: {} })
  }, [router.query])

  // useEffect(async () => {
  //   dispatch({ type: 'clear', data: {} })
  // }, [router.query])

  const fetchCandidates = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCandidates`);

      let candidates = await response.json();

      if (candidates) {
        return candidates;
      }
    
  };

  const fetchOpenings = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getOpenings`);

      let openings = await response.json();

      if (openings) {
        return openings;
      }
  };

  const createCandidate = async (name, email, phone, skills, onSuccess, onError) => {

    const data = {
      name: name,
      email: email,
      phone: phone,
      skills: skills
    };

    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createCandidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if(res.ok) {
        onSuccess();  
      } else {
        onError();
      }
    } catch (error) {
      console.error(error)
      onError()
    }
  }

  const createOpening = async (client, email, neededCandidates, skills, onSuccess, onError
  ) => {
    const data = {
      client: client,
      email: email,
      neededCandidates: neededCandidates,
      skills: skills,
    };

    try {
     let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createOpening`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(res.ok) {
        onSuccess();  
      } else {
        onError();
      }

    } catch (error) {
      console.error(error);
    }
  };

  const createSkill = async (name, onSuccess, onError) => {
    const data = {
      name: name
    };

    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createSkill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      if(res.ok) {
        onSuccess();  
      } else {
        onError();
      }
            
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkills = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getSkills`
    );

    let skills = await response.json();

    if (skills) {
      return skills;
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        fetchCandidates,
        createCandidate,
        fetchOpenings,
        createOpening,
        fetchSkills,
        createSkill,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}