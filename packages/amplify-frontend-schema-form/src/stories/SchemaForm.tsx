import React, {
  useCallback,
  useState,
  forwardRef,
  useEffect,
  useMemo,
} from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ModelField, ModelFields, Schema } from "@aws-amplify/datastore";
import { modelToFormSchemaItem } from "../utils/FormHelper";
import { useDropzone } from "react-dropzone";
import {
  XMarkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Error from "../Error";
import { Popover, Combobox } from "@headlessui/react";
import { usePopper } from "react-popper";
import clsx from "clsx";
import RichTextEditor from "./RichTextEditor";

export type FormElements = "select" | "input" | "textarea" | "combobox";
export type ElementProps = {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  values?: ElementPropsValues;
};
export type ElementPropsValues = {
  name: string;
  value: string;
}[];
export type FormSchemaItem = {
  name: string;
  label: string;
  tooltip?: string;
  defaultValue?: string | { name: string; value: string }[];
  isArray?: boolean;
  elementType: FormElements;
  elementProps: ElementProps;
};

export type FormDecorator = {
  formClassName: string;
  errorLayout: (error: string) => JSX.Element;
  fieldLayout: (
    fieldData: FormSchemaItem,
    getValues: any,
    control: any,
    register: any,
    setValue: any,
    errors: any
  ) => JSX.Element;
  divider: () => JSX.Element;
  submitButton: (loading: boolean, errors: any) => JSX.Element;
};

interface SchemaFormProps<T> {
  gqlSchema: Schema;
  onSubmit: (data: T) => Promise<void>;
  validationSchema: z.ZodSchema<T>;
  fieldSelection: ModelFields;
  dataModel?: Readonly<
    {
      id: string;
    } & Record<string, any>
  >;
  overrides?: Record<string, Partial<FormSchemaItem>>;
  propValueProvider?: (field: ModelField) => ElementPropsValues | undefined;
  formDecorator?: FormDecorator;
}

export default function SchemaForm<T extends FieldValues>({
  gqlSchema,
  onSubmit,
  validationSchema,
  fieldSelection,
  dataModel,
  overrides,
  propValueProvider,
  formDecorator = DefaultDecorator,
}: SchemaFormProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const schema = useMemo(() => {
    return modelToFormSchemaItem(
      fieldSelection,
      gqlSchema,
      overrides,
      dataModel,
      propValueProvider
    );
  }, [gqlSchema, fieldSelection, dataModel, overrides, propValueProvider]);
  const {
    getValues,
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...schema.reduce((acc, curr) => {
        acc[curr.name] = curr.defaultValue;
        return acc;
      }, {} as Record<string, any>),
    } as any,
  });
  console.log(errors);
  return (
    <form
      className={formDecorator.formClassName}
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);
        setError(null);
        try {
          await onSubmit(data);
        } catch (e) {
          setError("Error saving data.");
        }
        setLoading(false);
      })}
    >
      {schema.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {formDecorator.fieldLayout(
              row,
              getValues,
              control,
              register,
              setValue,
              errors
            )}
            {index !== schema.length - 1 && formDecorator.divider()}
          </React.Fragment>
        );
      })}
      {error && formDecorator.errorLayout(error)}
      {formDecorator.submitButton(loading, errors)}
    </form>
  );
}

export const DefaultDecorator: FormDecorator = {
  formClassName: "form",
  errorLayout: (error: string) => (
    <Error className="mb-8" type="small" text={error} />
  ),
  fieldLayout: (row, getValues, control, register, setValue, errors) => (
    <div className="form-control">
      <label className="form-label" htmlFor={row.name}>
        {row.label}
        {row.tooltip && <BaseToolTip text={row.tooltip} />}:
      </label>
      {row.isArray ? (
        <FieldArray
          name={row.name}
          control={control}
          register={register}
          getValues={getValues}
          setValue={setValue}
          elementProps={row.elementProps}
          elementType={row.elementType}
        />
      ) : (
        <ElementLookUp
          name={row.name}
          register={register}
          getValues={getValues}
          setValue={setValue}
          elementProps={row.elementProps}
          elementType={row.elementType}
        />
      )}
      <p className="form-error">
        {(errors as any)?.[row.name]?.message ??
          (errors as any)?.[row.name]?.[0]?.message ??
          (errors as any)?.[row.name]?.[0]?.value?.message}
      </p>
    </div>
  ),
  divider: () => <div className="pt-2 border-b-2 border-slate-300/25" />,
  submitButton: (loading, errors) => (
    <div>
      <button
        className="px-20 button-primary button-primary-variant-slate disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        type="submit"
        disabled={loading || Object.keys(errors).length > 0}
      >
        <div className="flex justify-between">
          {loading && <div className="animate-spin mr-3">I</div>}
          <span>Save</span>
        </div>
      </button>
    </div>
  ),
};

interface ElementLookUpProps {
  elementType: FormElements;
  elementProps: ElementProps;
  name: string;
  getValues: any;
  setValue: any;
  register: any;
}

const ElementLookUp = ({
  name,
  elementType,
  elementProps,
  getValues,
  setValue,
  register,
}: ElementLookUpProps) => {
  return (
    <>
      {elementType === "input" && elementProps.type === "file" && (
        <BaseFilePicker
          initialValue={getValues(name as any) as string | null}
          setValue={setValue}
          {...register(name as any)}
          {...elementProps}
        />
      )}
      {elementType === "input" && elementProps.type === "richtext" && (
        <BaseRichTextEditor
          initialValue={getValues(name as any) as string | null}
          setValue={setValue}
          {...register(name as any)}
          {...elementProps}
        />
      )}
      {elementType === "input" && elementProps.type === "checkbox" && (
        <div className="flex justify-start items-center space-x-2">
          <div>
          <input
            className="form-input"
            {...register(name as any)}
            {...elementProps}
          />
          </div>
          <div>
            {getValues(name as any) as string | null}
          </div>
        </div>
      )}
      {elementType === "input" &&
        elementProps.type !== "file" &&
        elementProps.type !== "richtext" &&
        elementProps.type !== "checkbox" && (
          <input
            className="form-input"
            {...register(name as any)}
            {...elementProps}
          />
        )}
      {elementType === "select" && (
        <select
          className="form-input"
          {...register(name as any)}
          {...elementProps}
        >
          {elementProps.values &&
            elementProps.values.map((value, index) => {
              return (
                <option key={index} value={value.value}>
                  {value.name}
                </option>
              );
            })}
        </select>
      )}
      {elementType === "combobox" && (
        <BaseCombobox
          initialValue={getValues(name as any) as string | null}
          setValue={setValue}
          {...register(name as any)}
          {...elementProps}
        />
      )}
      {elementType === "textarea" && (
        <textarea
          className="form-input"
          {...register(name as any)}
          {...elementProps}
        />
      )}
    </>
  );
};

const FieldArray = ({
  control,
  name,
  elementType,
  elementProps,
  getValues,
  setValue,
  register,
}: { control: any } & ElementLookUpProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  return (
    <div className="space-y-1">
      {fields.map((field, index) => (
        <div key={field.id} className="flex justify-center">
          <ElementLookUp
            name={`${name}.${index}`}
            register={register}
            getValues={getValues}
            setValue={setValue}
            elementProps={elementProps}
            elementType={elementType}
          />
          <XMarkIcon
            className="w-6 h-6 m-2 text-white bg-gray-300 rounded hover:text-gray-100 hover:cursor-pointer hover:bg-gray-400"
            aria-hidden="true"
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <div
        className="button-secondary button-secondary-variant-slate"
        onClick={() => append("")}
      >
        <PlusIcon className="w-6 h-6" />
        <span className="ml-2">Add Another</span>
      </div>
    </div>
  );
};

const BaseCombobox = forwardRef<
  HTMLTextAreaElement,
  ElementProps & { setValue: any; initialValue: any; name: any }
>(({ setValue, initialValue, name, ...props }, ref) => {
  const { values } = props as { values: ElementPropsValues };
  const [selectedValues, setSelectedValues] = useState<ElementPropsValues>([
    ...(initialValue ? initialValue : []),
  ]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setValue(name, selectedValues);
  }, [name, setValue, selectedValues]);
  const onRemoveBadge = useCallback(
    (value: any) => {
      const newSelectedItems = selectedValues.filter(
        (p) => p.name !== value.name
      );
      setSelectedValues(newSelectedItems);
    },
    [selectedValues]
  );
  const filteredItems = values.filter((value) => {
    return (
      (query === "" ||
        value.name.toLowerCase().includes(query.toLowerCase())) &&
      selectedValues.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(value)
      ) === -1
    );
  });

  return (
    <div>
      {selectedValues.length > 0 && (
        <div className="space-x-1 space-y-1 my-2">
          {selectedValues.map((value) => (
            <span
              key={value.name}
              className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700"
            >
              {value.name}
              <button
                type="button"
                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                onClick={() => onRemoveBadge(value)}
              >
                <span className="sr-only">Remove large option</span>
                <svg
                  className="h-2 w-2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 8 8"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M1 1l6 6m0-6L1 7"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
      <Combobox
        value={selectedValues}
        onChange={setSelectedValues as any}
        multiple
      >
        <Combobox.Input
          className="form-input"
          placeholder={props.placeholder}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(value: any) => value?.name}
        />
        <Combobox.Options className="absolute z-10 mt-18 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredItems.map((value) => (
            <Combobox.Option
              key={value.name}
              value={value}
              className={({ active }) =>
                clsx(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                )
              }
            >
              {value.name}
            </Combobox.Option>
          ))}
          {filteredItems.length === 0 && (
            <div className="flex space-x-2 items-center py-2 px-3">
              <FaceFrownIcon className="w-5 h-5" />
              <span className="title-sm ">No results</span>
            </div>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
});
BaseCombobox.displayName = "BaseCombobox";

const BaseRichTextEditor = forwardRef<HTMLTextAreaElement, any>(
  ({ setValue, initialValue, ...props }, ref) => {
    const [editorState, setEditorState] = useState<string>();
    const onStateChange = useCallback(
      (markdown: string) => {
        setValue(props.name, markdown, { shouldValidate: true });
        setEditorState(markdown);
      },
      [props.name, setValue]
    );
    return (
      <div>
        <RichTextEditor
          initialMarkdown={initialValue}
          onChange={onStateChange}
        />
      </div>
    );
  }
);
BaseRichTextEditor.displayName = "BaseRichTextEditor";

const BaseFilePicker = forwardRef<HTMLInputElement, any>(
  ({ setValue, initialValue, ...props }, ref) => {
    const [fileList, setFileList] = useState<File[] | null>();

    const onDrop = useCallback(
      (droppedFiles: any) => {
        setValue(props.name, droppedFiles, { shouldValidate: true });
        setFileList(droppedFiles);
      },
      [setValue, props.name]
    );

    const onCancel = useCallback(() => {
      setValue(props.name, null, { shouldValidate: true });
      setFileList(null);
    }, [setValue, props.name]);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
    });

    return (
      <div>
        <div
          className="w-full flex justify-center border-2 border-gray-300 border-dashed rounded-md"
          {...getRootProps()}
        >
          {fileList?.[0] || initialValue ? (
            <div key={0} className="relative">
              <XMarkIcon
                className="absolute top-0 right-0 w-6 h-6 m-2 text-white bg-gray-300 rounded hover:text-gray-100 hover:cursor-pointer hover:bg-gray-400"
                aria-hidden="true"
                onClick={onCancel}
              />
              <img
                className="w-full h-full rounded-sm object-contain"
                src={
                  fileList?.[0]
                    ? URL.createObjectURL(fileList?.[0])
                    : initialValue
                }
                alt="preview"
              />
            </div>
          ) : (
            <div className="space-y-1 text-center m-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <div className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input
                    className="sr-only"
                    ref={ref}
                    {...props}
                    {...getInputProps()}
                  />
                </div>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);
BaseFilePicker.displayName = "BaseFilePicker";

const BaseToolTip = ({ text }: { text: string }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });
  return (
    <Popover className="inline">
      <Popover.Button
        className="outline-none"
        ref={(ref: any) => setReferenceElement(ref)}
      >
        <QuestionMarkCircleIcon className="relative button-primary p-0 mx-1 text-gray-300 w-4 h-4 " />
      </Popover.Button>

      <Popover.Panel
        className="absolute z-10 bg-white border border-gray-200 px-2 py-1 rounded-md  shadow-lg"
        ref={(ref: any) => setPopperElement(ref)}
        style={styles.popper}
        {...attributes.popper}
      >
        <p className="z-10 body-sm text-gray-600 w-40 wrap break-space">
          {text}
        </p>
        <div ref={(ref: any) => setArrowElement(ref)} style={styles.arrow}>
          <ChevronDownIcon className="w-3 h-3 text-gray-200" />
        </div>
      </Popover.Panel>
    </Popover>
  );
};
