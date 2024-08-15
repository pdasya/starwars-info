import { FC } from "react";
import Button from "../../components/button/button";
import style from "./main-page.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Main: FC = () => {
  const formDataArray = useSelector(
    (state: RootState) => state.controlledForm.formData,
  );

  return (
    <div className={style.mainPageWrapper}>
      <div className={style.buttonWrapper}>
        <Button formName="Controlled Form" to="/controlled-form"></Button>
        <Button formName="Uncontrolled Form" to="/uncontrolled-form"></Button>
      </div>
      {formDataArray.length > 0 && (
        <div className={style.formDataDisplay}>
          <h2>Submitted Data (controlled form):</h2>
          <div className={style.cardsContainer}>
            {formDataArray.map((formData, index) => (
              <div key={index} className={style.card}>
                <h3>Submission {index + 1}</h3>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Age:</strong> {formData.age}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Gender:</strong> {formData.gender}
                </p>
                <p>
                  <strong>Country:</strong> {formData.country}
                </p>
                {formData.picture && (
                  <div>
                    <h4>Uploaded Picture:</h4>
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
