import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, useForm } from 'react-hook-form';
import { SchemaOf } from 'yup';

type IProps = {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  formSchema: SchemaOf<Object>;
};

const ReactHookFormProvider = ({ onSubmit, children, formSchema }: IProps) => {
  const methods = useForm<any>({
    resolver: yupResolver(formSchema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default ReactHookFormProvider;
