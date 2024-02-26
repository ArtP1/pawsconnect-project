import { AlertTitle, AlertDescription, Alert } from "@/components/ui/alert"


export default function SucessAlert() {
  return (
    <Alert key="1" className="fixed right-0 top-0 m-4 w-auto">
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>Your operation was successful.</AlertDescription>
      <div className="absolute top-0 right-0 m-2" />
    </Alert>
  )
}

