/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import {
  Field,
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Post, Tag, PostTag } from "../../../models";
import { fetchByPath, processFile, validateField } from "../../utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function PostCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    slug: "",
    title: "",
    description: "",
    content: "",
    image: undefined,
    published: false,
    tags: [],
  };
  const [slug, setSlug] = React.useState(initialValues.slug);
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [content, setContent] = React.useState(initialValues.content);
  const [image, setImage] = React.useState(initialValues.image);
  const [published, setPublished] = React.useState(initialValues.published);
  const [tags, setTags] = React.useState(initialValues.tags);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSlug(initialValues.slug);
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setContent(initialValues.content);
    setImage(initialValues.image);
    setPublished(initialValues.published);
    setTags(initialValues.tags);
    setCurrentTagsValue(undefined);
    setCurrentTagsDisplayValue("");
    setErrors({});
  };
  const [currentTagsDisplayValue, setCurrentTagsDisplayValue] =
    React.useState("");
  const [currentTagsValue, setCurrentTagsValue] = React.useState(undefined);
  const tagsRef = React.createRef();
  const getIDValue = {
    tags: (r) => JSON.stringify({ name: r?.name }),
  };
  const tagsIdSet = new Set(
    Array.isArray(tags)
      ? tags.map((r) => getIDValue.tags?.(r))
      : getIDValue.tags?.(tags)
  );
  const tagRecords = useDataStoreBinding({
    type: "collection",
    model: Tag,
  }).items;
  const getDisplayValue = {
    tags: (r) => r?.name,
  };
  const validations = {
    slug: [
      { type: "Required" },
      {
        type: "NotContains",
        strValues: ["' '"],
        validationMessage: "The value must not contain spaces",
      },
      {
        type: "NotContains",
        strValues: ["&", "?", "$", "#", "/", "=", "@", "+"],
        validationMessage:
          'The value must not contain "&" or "?" or "$" or "#" or "/" or "=" or "@" or "+"',
      },
    ],
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    content: [{ type: "Required" }],
    image: [{ type: "Required" }],
    published: [{ type: "Required" }],
    tags: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          slug,
          title,
          description,
          content,
          image,
          published,
          tags,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const modelFieldsToSave = {
            slug: modelFields.slug,
            title: modelFields.title,
            description: modelFields.description,
            content: modelFields.content,
            image: modelFields.image,
            published: modelFields.published,
          };
          const post = await DataStore.save(new Post(modelFieldsToSave));
          const promises = [];
          promises.push(
            ...tags.reduce((promises, tag) => {
              promises.push(
                DataStore.save(
                  new PostTag({
                    post,
                    tag,
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostCreateForm")}
      {...rest}
    >
      <TextField
        label="Slug"
        descriptiveText=""
        isRequired={true}
        isReadOnly={false}
        placeholder="Enter url safe post slug here"
        value={slug}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              slug: value,
              title,
              description,
              content,
              image,
              published,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.slug ?? value;
          }
          if (errors.slug?.hasError) {
            runValidationTasks("slug", value);
          }
          setSlug(value);
        }}
        onBlur={() => runValidationTasks("slug", slug)}
        errorMessage={errors.slug?.errorMessage}
        hasError={errors.slug?.hasError}
        {...getOverrideProps(overrides, "slug")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        placeholder="Enter post title here"
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              slug,
              title: value,
              description,
              content,
              image,
              published,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextAreaField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        placeholder="Enter post description for SEO"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              slug,
              title,
              description: value,
              content,
              image,
              published,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextAreaField>
      <TextAreaField
        label="Content"
        isRequired={true}
        isReadOnly={false}
        placeholder="Enter post body, Markup is supported"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              slug,
              title,
              description,
              content: value,
              image,
              published,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextAreaField>
      <Field
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        label={"Image"}
        isRequired={true}
        isReadOnly={false}
      >
        <StorageManager
          onUploadSuccess={({ key }) => {
            setImage((prev) => {
              let value = key;
              if (onChange) {
                const modelFields = {
                  slug,
                  title,
                  description,
                  content,
                  image: value,
                  published,
                  tags,
                };
                const result = onChange(modelFields);
                value = result?.image ?? value;
              }
              return value;
            });
          }}
          onFileRemove={({ key }) => {
            setImage((prev) => {
              let value = initialValues?.image;
              if (onChange) {
                const modelFields = {
                  slug,
                  title,
                  description,
                  content,
                  image: value,
                  published,
                  tags,
                };
                const result = onChange(modelFields);
                value = result?.image ?? value;
              }
              return value;
            });
          }}
          processFile={processFile}
          accessLevel={"public"}
          acceptedFileTypes={[]}
          isResumable={false}
          showThumbnails={true}
          maxFileCount={1}
          {...getOverrideProps(overrides, "image")}
        ></StorageManager>
      </Field>
      <SwitchField
        label="Published"
        defaultChecked={false}
        isDisabled={false}
        isChecked={published}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              slug,
              title,
              description,
              content,
              image,
              published: value,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.published ?? value;
          }
          if (errors.published?.hasError) {
            runValidationTasks("published", value);
          }
          setPublished(value);
        }}
        onBlur={() => runValidationTasks("published", published)}
        errorMessage={errors.published?.errorMessage}
        hasError={errors.published?.hasError}
        {...getOverrideProps(overrides, "published")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              slug,
              title,
              description,
              content,
              image,
              published,
              tags: values,
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue(undefined);
          setCurrentTagsDisplayValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        getBadgeText={getDisplayValue.tags}
        setFieldValue={(model) => {
          setCurrentTagsDisplayValue(model ? getDisplayValue.tags(model) : "");
          setCurrentTagsValue(model);
        }}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Tags"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Tag"
          value={currentTagsDisplayValue}
          options={tagRecords
            .filter((r) => !tagsIdSet.has(getIDValue.tags?.(r)))
            .map((r) => ({
              id: getIDValue.tags?.(r),
              label: getDisplayValue.tags?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentTagsValue(
              tagRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTagsDisplayValue(label);
            runValidationTasks("tags", label);
          }}
          onClear={() => {
            setCurrentTagsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsDisplayValue(value);
            setCurrentTagsValue(undefined);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsDisplayValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
