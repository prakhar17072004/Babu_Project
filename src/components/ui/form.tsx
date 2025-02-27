import React from 'react'
import { Button } from './button'

function form() {
  return (
    <div>
        <form>
            <label>UseName</label>
            <input type='text' placeholder='Enter your Name'/>
            <label>Mobile Number</label>
            <input placeholder='Enter your number' type="number"/>
            <Button variant="outline">Apply</Button>
        </form>
    </div>
  )
}

export default form