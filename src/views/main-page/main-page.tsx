import { FC } from "react";
import Button from "../../components/button/button";
import style from "./main-page.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Main: FC = () => {
  const formData = useSelector((state: RootState) => state.formData.formData);

  return (
    <div className={style.mainPageWrapper}>
      <div className={style.buttonWrapper}>
        <Button formName="Controlled Form" to="/controlled-form"></Button>
        <Button formName="Uncontrolled Form" to="/uncontrolled-form"></Button>
      </div>
      {formData && (
        <div className={style.formDataDisplay}>
          <h2>Submitted Data (controlled form):</h2>
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
              <h3>uploaded Picture:</h3>
              <img
                src={formData.picture}
                alt="Uploaded"
                className={style.uploadedImage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
