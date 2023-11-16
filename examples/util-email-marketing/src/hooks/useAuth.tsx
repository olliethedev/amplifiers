import {useReducer, useState, useEffect} from 'react';
import  {getCurrentUser, signOut} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils'

const amplifyAuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_USER_DATA_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_USER_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload.user,
      };
    case 'FETCH_USER_DATA_FAILURE':
      return {...state, isLoading: false, isError: true};
    case 'RESET_USER_DATA':
      return {...state, user: null};
    default:
      throw new Error();
  }
};

const useAuth = () => {
  const initialState = {
    isLoading: true,
    isError: false,
    user: null,
  };
  const [state, dispatch] = useReducer(amplifyAuthReducer, initialState);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (isMounted) {
        dispatch({type: 'FETCH_USER_DATA_INIT'});
      }
      try {
        if (isMounted) {
          const data = await getCurrentUser();
          if (data) {
            dispatch({
              type: 'FETCH_USER_DATA_SUCCESS',
              payload: {user: data},
            });
          }
        }
      } catch (error) {
        if (isMounted) {
          dispatch({type: 'FETCH_USER_DATA_FAILURE'});
        }
      }
    };

    const eventHandler = (data: any) => {
      const {payload} = data;
      onAuthEvent(payload);
    };

    let hubListenerCancel: () => void; // Declare a variable to hold the cancel function

    const HubListener = () => {
      hubListenerCancel = Hub.listen('auth', (data: any) => {
        console.log('Listening for all messages: ', data.payload.data);
        eventHandler(data); // Call the existing event handler
      });
    };

    const onAuthEvent = (payload: any) => {
      switch (payload.event) {
        case 'signIn':
          if (isMounted) {
            setTriggerFetch(true);
            console.log('signed in');
          }
          break;
        default:
          return;
      }
    };

    HubListener();
    fetchUserData();

    return () => {
      hubListenerCancel()
      isMounted = false;
    };
  }, [triggerFetch]);

  const handleSignout = async () => {
    try {
      console.log('signed out');
      await signOut();
      setTriggerFetch(false);
      dispatch({type: 'RESET_USER_DATA'});
    } catch (error) {
      console.error('Error signing out user ', error);
    }
  };

  return {state, handleSignout};
};

export default useAuth;
