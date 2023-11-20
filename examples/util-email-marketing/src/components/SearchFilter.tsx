import React, { useEffect } from 'react'
import Filters from './forms/Filters'
import { generateClient } from 'aws-amplify/api';
import { listEmailLists } from '../graphql/queries';
import { Loader } from '@aws-amplify/ui-react';
const client = generateClient();

interface SearchFilterProps {
    onChange: (name: string, emailList: string) => void;
}

export const SearchFilter = ({onChange}:SearchFilterProps) => {
  const [emailLists, setEmailLists] = React.useState<string[]>();


    React.useEffect(() => {
        const call = async () => {
        const emailLists = await client.graphql({
            query: listEmailLists,
        });
        setEmailLists(emailLists.data.listEmailLists.items.map((item) => item.name));
        };
        call();
    }, []);
  return (
    emailLists ? <SearchFilterComponent options={emailLists} onChange={onChange} /> : <Loader />
  )
}

interface SearchFilterComponentProps extends SearchFilterProps {
    options: string[]
}
const SearchFilterComponent = ({options, onChange}: SearchFilterComponentProps) => {

    const [emailList, setEmailList] = React.useState<string>("All");
    const [name, setName] = React.useState<string>("");

    useEffect(() => {
        onChange(name, emailList);
    }, [name, emailList]);

  return (
    <Filters overrides={{
        SearchField:{
            label: "Recipient Name",
            onChange:(e: React.ChangeEvent<HTMLInputElement>)=>{
                const { value } = e.target;
                setName(value);
            },
            onSubmit:(e)=>{
                setName(e as string);
            },
            value: name
        },
        SelectField:{
            label: "Email List",
            onChange:(e )=>{
                console.log(e)
                const { value } = e.target as HTMLSelectElement;
                setEmailList(value);
            },
            options: [...options],
            value: emailList
        },
    }} />
  )
}
