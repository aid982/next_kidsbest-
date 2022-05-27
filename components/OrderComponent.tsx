import { Box, Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react'
import NumberFormat from 'react-number-format';


type Props = {
    onSubmit:( values:any) => void,
}

export default function OrderComponent({onSubmit }: Props) {
 
    const form = useForm({
        initialValues: {
            phone: '',
            fio: '',
            address: '',
        },
        validate: {
            phone: (value: string) => (value.length > 0 ? null : 'Невірний номер телефону'),
            fio: (value: string) => (value.length > 0 ? null : 'Поле не може бути порожнім'),
            address: (value: string) => (value.length > 0 ? null : 'Поле не може бути порожнім'),

        },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <NumberFormat customInput={TextInput} format="+38(###) ###-##-##"  {...form.getInputProps('phone')} required
                    label="Номер телефону"
                    placeholder="+38(999) 999-99-99" />
                <TextInput
                    required
                    label="ФІО"
                    placeholder="Фамілія Ім'я По Батькові"
                    {...form.getInputProps('fio')}
                />

                <TextInput
                    required
                    label="Адреса,Номер віділення нової пошти"
                    placeholder="Фамілія Ім'я По Батькові"
                    {...form.getInputProps('address')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    )
}