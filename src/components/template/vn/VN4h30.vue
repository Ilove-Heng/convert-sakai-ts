<template>
    <!-- <pre>{{ resultNumber }}</pre> -->
    <!-- :validation-schema="validationSchema" -->
    <Form @submit="onFormSubmit" :initial-values="{ resultNumber }">
        <table>
            <tbody>
                <!-- First 17 fields (Giải) -->
                <tr v-for="idx in 17" :key="`g${idx}`">
                    <td class="labelcell">
                        <div class="label">
                            <label>Giải {{ 17 - idx + 1 }}</label>
                        </div>
                    </td>
                    <td>
                    <Field :name="`resultNumber.${idx-1}`" v-slot="{ field, errorMessage }">
                            <IconField>
                                <InputText 
                                    v-bind="field"
                                    @update:model-value="resultNumber[idx-1] = $event"
                                    :class="{ 'p-invalid': errorMessage }"
                                    class="w-full" 
                                    v-keyfilter.num
                                    maxlength="2"
                                />
                                <InputIcon>2D</InputIcon>
                            </IconField>
                        </Field>
                    </td>
                </tr>

                <!-- Other fields (DB, C, D, etc.) -->
                <tr v-for="(label, idx) in specialFields" :key="label">
                    <td class="labelcell">
                        <div class="label">
                            <label>{{ label }}</label>
                        </div>
                    </td>
                    <td v-for="i in 2" :key="i">
                        <Field :name="`resultNumber.${17 + (idx * 2) + i - 1}`" v-slot="{ field, errorMessage }">
                            <IconField>
                                <InputText 
                                    v-bind="field"
                                    @update:model-value="resultNumber[17 + (idx * 2) + i - 1] = $event"
                                    :class="{ 'p-invalid': errorMessage }"
                                    class="w-full" 
                                />
                                <InputIcon>{{ i === 1 ? '2D' : '3D' }}</InputIcon>
                            </IconField>
                        </Field>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-end mt-1 gap-2">
            <Button severity="danger" icon="pi pi-globe" label="ទាញលិទ្ធផល" @click="onScrap" />
            <Button type="submit" icon="pi pi-save" severity="info" label="រក្សាទុក" />
        </div>
    </Form>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate';
// import { toTypedSchema } from '@vee-validate/zod';
// import { z } from 'zod';

const specialFields = ['DB', 'C', 'D', 'F', 'I', 'N', 'K'];

const resultNumber = defineModel<string[] | any>({
    default: () => Array(31).fill('')
});

// const validationSchema = toTypedSchema(
//   z.object({
//     resultNumber: z.array(
//       z
//         .string()
//         .min(2, 'ត្រូវការយ៉ាងតូច 2 តួរ')
//         .max(10, 'មិនអាចលើសពី 10 តួរ')
//         .regex(/^\d+$/, 'សូមបញ្ចូលតែលេខ')
//     ).length(31)
//   })
// );

const onFormSubmit = (values: any) => {
    console.log('Form submitted:', values);
    emit('submit', values.resultNumber as string[]);
};

const onScrap = (event: Event) => {
    emit('scrap', event);
};

const emit = defineEmits<{
    (e: 'submit', values: string[]): void;
    (e: 'scrap', event: Event): void;
}>();
</script>