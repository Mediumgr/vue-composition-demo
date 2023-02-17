import { ref, reactive, watch } from 'vue';

export function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const touched = ref(false);
  const errors = reactive({});

  const reassign = (val) => {
    valid.value = true;

    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](val);
      console.log('val', val);
      errors[name] = !isValid;

      if (errors[name]) {
        valid.value = false;
      }
      console.log('errors', errors);
    });
  };

  watch(value, reassign, { immediate: true });

  return { value, valid, errors, touched, blur: () => (touched.value = true) };
}
