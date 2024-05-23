import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useCSVReader } from "react-papaparse";
import { UploadIcon } from "lucide-react";

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton: FC<Props> = ({ onUpload }) => {
  const { CSVReader } = useCSVReader();
  // TODO: Add a paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          size="sm"
          variant="outline"
          className="w-full lg:w-auto"
          {...getRootProps()}
        >
          <UploadIcon className="mr-2 size-4" />
          Importar
        </Button>
      )}
    </CSVReader>
  );
};
