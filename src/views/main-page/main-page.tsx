import { FC } from "react";
import Button from "../../components/button/button";
import style from "./main-page.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Main: FC = () => {
  const controlledFormDataArray = useSelector(
    (state: RootState) => state.controlledForm.formData,
  );

  const uncontrolledFormDataArray = useSelector(
    (state: RootState) => state.uncontrolledForm.formData,
  );

  return (
    <div className={style.mainPageWrapper}>
      <div className={style.buttonWrapper}>
        <Button formName="Controlled Form" to="/controlled-form"></Button>
        <Button formName="Uncontrolled Form" to="/uncontrolled-form"></Button>
      </div>
      {controlledFormDataArray.length > 0 && (
        <div className={style.formDataDisplay}>
          <h2>Submitted Data (controlled form):</h2>
          <div className={style.cardsContainer}>
            {controlledFormDataArray.map((formData, index) => (
              <div
                key={index}
                className={
                  index !== uncontrolledFormDataArray.length - 1
                    ? style.card
                    : style.lastCard
                }
              >
                <h3>Submission {index + 1}</h3>
                <p>
                  <strong>name:</strong> {formData.name}
                </p>
                <p>
                  <strong>age:</strong> {formData.age}
                </p>
                <p>
                  <strong>email:</strong> {formData.email}
                </p>
                <p>
                  <strong>gender:</strong> {formData.gender}
                </p>
                <p>
                  <strong>country:</strong> {formData.country}
                </p>
                {formData.picture && (
                  <div>
                    <h4>uploaded Picture:</h4>
                    <img
                      src={formData.picture}
                      alt={`Uploaded ${index + 1}`}
                      className={style.uploadedImage}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {uncontrolledFormDataArray.length > 0 && (
        <div className={style.formDataDisplay}>
          <h2>Submitted Data (uncontrolled form):</h2>
          <div className={style.cardsContainer}>
            {uncontrolledFormDataArray.map((formData, index) => (
              <div
                key={index}
                className={
                  index !== uncontrolledFormDataArray.length - 1
                    ? style.card
                    : style.lastCard
                }
              >
                <h3>Submission {index + 1}</h3>
                <p>
                  <strong>name:</strong> {formData.name}
                </p>
                <p>
                  <strong>age:</strong> {formData.age}
                </p>
                <p>
                  <strong>email:</strong> {formData.email}
                </p>
                <p>
                  <strong>gender:</strong> {formData.gender}
                </p>
                <p>
                  <strong>country:</strong> {formData.country}
                </p>
                {formData.picture && (
                  <div>
                    <h4>uploaded Picture:</h4>
                    <img
                      src={formData.picture}
                      alt={`Uploaded ${index + 1}`}
                      className={style.uploadedImage}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
