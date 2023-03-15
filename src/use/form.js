import { computed, reactive } from 'vue';
import { useField } from './field';

export function useForm(init = {}) {
  const form = reactive({});
  const validKey = 'valid';

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
    console.log('not_form_ready', form);
  }

  form[validKey] = computed(() => {
    return Object.keys(form)
      .filter((k) => k !== validKey)
      .every((k) => form[k].valid);
  });
  console.log('form_ready', form);
  return form;
}
