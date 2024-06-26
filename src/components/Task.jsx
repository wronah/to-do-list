import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Task = ({task, deleteTask}) => {
  return (
    <Card className="w-[350px] mt-4">
      <CardHeader>
        <CardTitle>{task.heading}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={() => {displayTask(task.id)}}>Edit</Button>
        <Button className="ml-2" onClick={() => {deleteTask(task.id)}}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default Task;
