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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import {
  Field,
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Post, Tag, PostTag } from "../../../models";
import { fetchByPath, processFile, validateField } from "../../utils";
import { DataStore } from "aws-amplify";
import MDEditor from "@uiw/react-md-editor";
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
export default function PostUpdateForm(props) {
  const {
    slug: slugProp,
    post: postModelProp,
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
    const cleanValues = postRecord
      ? { ...initialValues, ...postRecord, tags: linkedTags }
      : initialValues;
    setSlug(cleanValues.slug);
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setContent(cleanValues.content);
    setImage(cleanValues.image);
    setPublished(cleanValues.published);
    setTags(cleanValues.tags ?? []);
    setCurrentTagsValue(undefined);
    setCurrentTagsDisplayValue("");
    setErrors({});
  };
  const [postRecord, setPostRecord] = React.useState(postModelProp);
  const [linkedTags, setLinkedTags] = React.useState([]);
  const canUnlinkTags = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = slugProp
        ? await DataStore.query(Post, slugProp)
        : postModelProp;
      setPostRecord(record);
      const linkedTags = record
        ? await Promise.all(
            (
              await record.tags.toArray()
            ).map((r) => {
              return r.tag;
            })
          )
        : [];
      setLinkedTags(linkedTags);
    };
    queryData();
  }, [slugProp, postModelProp]);
  React.useEffect(resetStateValues, [postRecord, linkedTags]);
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
    slug: [{ type: "Required" }],
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
          const promises = [];
          const tagsToLinkMap = new Map();
          const tagsToUnLinkMap = new Map();
          const tagsMap = new Map();
          const linkedTagsMap = new Map();
          tags.forEach((r) => {
            const count = tagsMap.get(getIDValue.tags?.(r));
            const newCount = count ? count + 1 : 1;
            tagsMap.set(getIDValue.tags?.(r), newCount);
          });
          linkedTags.forEach((r) => {
            const count = linkedTagsMap.get(getIDValue.tags?.(r));
            const newCount = count ? count + 1 : 1;
            linkedTagsMap.set(getIDValue.tags?.(r), newCount);
          });
          linkedTagsMap.forEach((count, id) => {
            const newCount = tagsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                tagsToUnLinkMap.set(id, diffCount);
              }
            } else {
              tagsToUnLinkMap.set(id, count);
            }
          });
          tagsMap.forEach((count, id) => {
            const originalCount = linkedTagsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                tagsToLinkMap.set(id, diffCount);
              }
            } else {
              tagsToLinkMap.set(id, count);
            }
          });
          tagsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const postTagRecords = await DataStore.query(PostTag, (r) =>
              r.and((r) => {
                return [
                  r.tagName.eq(recordKeys.name),
                  r.postSlug.eq(postRecord.slug),
                ];
              })
            );
            for (let i = 0; i < count; i++) {
              promises.push(DataStore.delete(postTagRecords[i]));
            }
          });
          tagsToLinkMap.forEach((count, id) => {
            const tagToLink = tagRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new PostTag({
                    post: postRecord,
                    tag: tagToLink,
                  })
                )
              );
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
          promises.push(
            DataStore.save(
              Post.copyOf(postRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostUpdateForm")}
      {...rest}
    >
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
      <TextField
        label="Slug"
        isRequired={true}
        isReadOnly={true}
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
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
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
      ></TextField>
      <Field
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        label={"Image"}
        isRequired={true}
        isReadOnly={false}
      >
        {postRecord && (
          <StorageManager
            defaultFiles={[{ key: postRecord.image }]}
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
        )}
      </Field>
      <Field
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        label={"Content"}
        isRequired={true}
        isReadOnly={false}
      >
        <MDEditor
          style={{
            borderColor: "var(--amplify-components-fieldcontrol-border-color)",
            borderRadius:
              "var(--amplify-components-fieldcontrol-border-radius)",
            borderStyle: "var(--amplify-components-fieldcontrol-border-style)",
            borderWidth: "var(--amplify-components-fieldcontrol-border-width)",
            outlineColor:
              "var(--amplify-components-fieldcontrol-outline-color)",
            outlineStyle:
              "var(--amplify-components-fieldcontrol-outline-style)",
            outlineWidth:
              "var(--amplify-components-fieldcontrol-outline-width)",
            outlineOffset:
              "var(--amplify-components-fieldcontrol-outline-offset)",
            boxShadow: "none",
          }}
          height={200}
          value={content}
          onBlurCapture={() => runValidationTasks("content", content)}
          onChange={(value) => {
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
        />
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(slugProp || postModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(slugProp || postModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
