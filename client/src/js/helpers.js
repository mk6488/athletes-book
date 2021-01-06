import {
  computed
} from "vue"

export const now = computed(() => {
  const parts = new Date().toLocaleString().split(",")[0].split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
});

export const getWeekNumber = (inputDate) => {
  const commentDateToIsoDate = inputDate;
  const parts = commentDateToIsoDate.split("-");
  const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  return new Date(mydate).getWeek();
};

Date.prototype.getWeek = function () {
  var seasonStart = new Date(2020, 8, 7);
  return Math.ceil(
    ((this - seasonStart) / 86400000 + seasonStart.getDay() - 1) / 7
  );
};

export const close = () => {
  this.$emit("close");
  this.$emit("fetch");
};