import { CheckCircledIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SuccessAlert({
  className,
  title = "Success",
  message,
}: {
  className?: string;
  title?: string;
  message: string;
}) {
  return (
    <Alert variant="success" className={className}>
      <CheckCircledIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{message}</p>
      </AlertDescription>
    </Alert>
  );
}
