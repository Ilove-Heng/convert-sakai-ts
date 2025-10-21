<template>
    <FloatingConfigurator />
    <div
        class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class=" w-26 shrink-0 mx-auto">
                            <!-- Dashboard background -->
                            <rect x="4" y="8" width="56" height="48" rx="4" fill="#f0f4f8" stroke="#4F46E5"
                                stroke-width="2" />

                            <!-- Header bar -->
                            <rect x="4" y="8" width="56" height="12" rx="4" fill="#4F46E5" />
                            <circle cx="12" cy="14" r="2" fill="#ffffff" />
                            <circle cx="18" cy="14" r="2" fill="#ffffff" />
                            <circle cx="24" cy="14" r="2" fill="#ffffff" />

                            <!-- Lottery balls -->
                            <circle cx="18" cy="35" r="7" fill="#EF4444" stroke="#991B1B" stroke-width="1.5" />
                            <text x="18" y="38" font-family="Arial, sans-serif" font-size="8" font-weight="bold"
                                fill="#ffffff" text-anchor="middle">7</text>

                            <circle cx="32" cy="35" r="7" fill="#3B82F6" stroke="#1E40AF" stroke-width="1.5" />
                            <text x="32" y="38" font-family="Arial, sans-serif" font-size="8" font-weight="bold"
                                fill="#ffffff" text-anchor="middle">23</text>

                            <circle cx="46" cy="35" r="7" fill="#10B981" stroke="#047857" stroke-width="1.5" />
                            <text x="46" y="38" font-family="Arial, sans-serif" font-size="8" font-weight="bold"
                                fill="#ffffff" text-anchor="middle">42</text>

                            <!-- Ticket icon -->
                            <rect x="10" y="46" width="16" height="8" rx="1" fill="#ffffff" stroke="#4F46E5"
                                stroke-width="1.5" stroke-dasharray="2,2" />
                            <circle cx="13" cy="50" r="1" fill="#4F46E5" />
                            <circle cx="17" cy="50" r="1" fill="#4F46E5" />
                            <circle cx="21" cy="50" r="1" fill="#4F46E5" />

                            <!-- Chart bars -->
                            <rect x="32" y="52" width="4" height="6" rx="1" fill="#8B5CF6" />
                            <rect x="38" y="48" width="4" height="10" rx="1" fill="#8B5CF6" />
                            <rect x="44" y="50" width="4" height="8" rx="1" fill="#8B5CF6" />
                            <rect x="50" y="46" width="4" height="12" rx="1" fill="#8B5CF6" />

                            <!-- Sparkle effects -->
                            <path d="M52 28 L53 30 L55 31 L53 32 L52 34 L51 32 L49 31 L51 30 Z" fill="#FCD34D" />
                            <path d="M14 24 L14.5 25 L15.5 25.5 L14.5 26 L14 27 L13.5 26 L12.5 25.5 L13.5 25 Z"
                                fill="#FCD34D" />
                        </svg>



                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Lottery
                            Result!</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <Form :resolver @submit="onFormSubmit">
                        <FormField v-slot="$field" as="section" name="username" initialValue=""
                            class="flex flex-col gap-2">
                            <label for="username"
                                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mt-2">Username</label>
                            <InputText id="username" type="text" placeholder="Username" class="w-full md:w-[30rem] " />
                            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                                $field.error?.message }}</Message>
                        </FormField>
                        <FormField v-slot="$field" asChild name="password" initialValue="">
                            <section class="flex flex-col gap-2">
                                <label for="password"
                                    class="block text-surface-900 dark:text-surface-0 text-xl font-medium mt-2">Password</label>
                                <Password id="password" type="text" placeholder="Password" :feedback="false" toggleMask
                                    fluid />
                                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                                    $field.error?.message }}</Message>
                            </section>
                        </FormField>
                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot
                                password?</span>
                        </div>
                        <Button type="submit" label="Submit" class="w-full" />
                    </Form>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'vue-router';
// tanstack query
import { useMutation } from '@tanstack/vue-query';
// api imported
import { authService, type LoginCredentials } from '@/api';
// middleware imported
import { useAuth } from '@/middleware/auth';

const checked = ref(false)
const errorMessage = ref('');
const router = useRouter();
const { setToken } = useAuth();



const resolver = zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        password: z
            .string()
            .min(3, { message: 'Minimum 3 characters.' })
            .max(12, { message: 'Maximum 12 characters.' })
    })
);

const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
        setToken(response.data.token);
        errorMessage.value = '';
        router.push('/dashboard');
    },
    onError: (error: any) => {
        console.error('Login failed:', error);
        errorMessage.value = error?.response?.data?.message || 'Invalid credentials. Please try again.';
    }
});

const onFormSubmit = (e: { originalEvent: Event; valid: boolean; states: any; errors: any; values: any; reset: () => void }) => {
    // e.originalEvent: Represents the native form submit event.
    // e.valid: A boolean that indicates whether the form is valid or not.
    // e.states: Contains the current state of each form field, including validity status.
    // e.errors: An object that holds any validation errors for the invalid fields in the form.
    // e.values: An object containing the current values of all form fields.
    // e.reset: A function that resets the form to its initial state.

    console.log('e', e);


    if (e.valid) {
        const { username, password } = e.states as { username: any, password: any };
        if (!username.value || !password.value) {
            errorMessage.value = 'Please fill in all fields';
            return;
        }

        errorMessage.value = '';
        loginMutation.mutate({
            username: username.value,
            password: password.value
        });

        // toast.add({
        //     severity: 'success', summary: 'Form is submitted.', detail: 'Message Content', life: 2500, group: 'br'
        // })
    }

};
</script>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
