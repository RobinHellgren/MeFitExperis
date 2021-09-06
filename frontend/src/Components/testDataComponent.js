import {useSelector, useDispatch} from "react-redux"
import { useEffect, useLayoutEffect } from 'react';
import { testActionFetch } from '../Store/Actions/testActions';

export default function TestComponent() {
    const dispath = useDispatch()
    const testData = useSelector(state => state.testData.data)
    useEffect(()=> {
        dispath(testActionFetch())
      },[])
    return <h5>{testData}</h5>
}