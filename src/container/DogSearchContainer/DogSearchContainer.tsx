import { useEffect, useState } from "react";
import { dogs } from "../../api/endpoints/dogs";
import DogList from "./dogList/DogList";
import { useAtom } from "jotai";
import {
  breeds,
  dataCount,
  defaultSize,
  error,
  errorMessage,
  maxAge,
  minAge,
  page,
  selectedDogs,
  sort,
  userEmail,
  userName,
  zipCodes,
} from "../../globalStore/atom";
import Filters from "./Filters";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { ArrowBack, ArrowForward, LogoutOutlined } from "@mui/icons-material";
import Dropdown from "../../components/dropdown/Dropdown";
import Button from "../../components/buttons/Button";
import { locations } from "../../api/endpoints/locations";
import { auth } from "../../api/endpoints/auth";
import MatchPopup from "./dogMatch/MatchPopup";
import Dog from "../../interfaces/Dog";
import Location from "../../interfaces/Location";
import Footer from "../../components/footer/Footer";

export default function DogSearchContainer({
  onReset,
}: {
  onReset: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [selectedDogList, setSelectedDogList] = useAtom<Dog[]>(selectedDogs);
  const [currentPage, setCurrentPage] = useAtom(page);
  const [size] = useAtom(defaultSize);
  const [count, setCount] = useAtom(dataCount);
  const [currentSort] = useAtom(sort);
  const [loading, setLoading] = useState(false);
  const [dogBreeds] = useAtom(breeds);
  const [dogMinAge] = useAtom(minAge);
  const [dogMaxAge] = useAtom(maxAge);
  const [dogZipCodes] = useAtom(zipCodes);
  const [name] = useAtom(userName);
  const [email] = useAtom(userEmail);
  const [matchResult, setMatchResult] = useState<Dog | null>(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const [, setErrorOcurred] = useAtom(error);
  const [, setErrorOcurredMsg] = useAtom(errorMessage);

  /*Function to logout */
  const onClickLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    const postData = {
      name: name,
      email: email,
    };
    auth
      .logout(postData)
      .then((res) => {
        res && onReset(event);
        return res;
      })
      .catch((err) => {
        setErrorOcurred(true);
        setErrorOcurredMsg(err);
        return err;
      });
  };

  /*Function to find the dog match on Match button click */
  const onClickMatch = () => {
    dogs
      .getMatch(selectedDogList)
      .then((res: any) => {
        locations
          .getLocation([res.match.zip_code])
          .then((locationData: Location[]) => {
            const matchedLocation = locationData[0];
            const matchedDogWithLocation = {
              ...res.match,
              city: matchedLocation?.city || "Unknown",
              state: matchedLocation?.state || "Unknown",
            };
            setMatchResult(matchedDogWithLocation);
            setShowMatchPopup(true);
            return res;
          })
          .catch((err) => {
            setErrorOcurred(true);
            setErrorOcurredMsg(err);
            return err;
          });
      })
      .catch((err) => {
        setErrorOcurred(true);
        setErrorOcurredMsg(err);
        return err;
      });
  };

  const onClickClearMatch = () => {
    setSelectedDogList([]);
  };

  /*Function to close match popup */
  const handleClosePopup = () => setShowMatchPopup(false);

  /*Function to handle page change in pagination component */
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  /*Function to call the search and filter api for dogs */
  useEffect(() => {
    const filters = {
      breeds: dogBreeds,
      ageMin: dogMinAge,
      ageMax: dogMaxAge,
      zipCodes: dogZipCodes,
      size: size,
      from: (currentPage - 1) * size,
      sort: currentSort,
    };

    setLoading(true);

    dogs
      .searchDogs(filters)
      .then((res: any) => {
        setCount(res.total);
        return dogs.getDogs(res.resultIds);
      })
      .then(async (dogData: any) => {
        const zipCodes: string[] = Array.from(
          new Set(dogData.map((dog: Dog) => dog.zip_code))
        );
        const locationData: Location[] = await locations.getLocation(zipCodes);

        const updatedDogData = dogData.map((dog: Dog) => {
          const location = locationData.find(
            (loc: any) => loc && loc.zip_code === dog.zip_code
          );
          return {
            ...dog,
            city: location?.city || "Unknown",
            state: location?.state || "Unknown",
          };
        });
        setDogList(updatedDogData as Dog[]);
        setLoading(false);
        return dogData;
      })
      .catch((err) => {
        setErrorOcurred(true);
        setErrorOcurredMsg(err);
        setLoading(false);
        return err;
      });
  }, [
    currentPage,
    size,
    currentSort,
    setCount,
    dogBreeds,
    dogMinAge,
    dogMaxAge,
    dogZipCodes,
    setErrorOcurred,
    setErrorOcurredMsg,
  ]);

  return (
    <div className="flex flex-col h-full max-w-screen min-w-full">
      <div className="flex flex-row flex-wrap bg-yellow-100">
        <Filters />

        <div
          id="dog-list-conteiner"
          className="h-screen flex flex-col justify-start items-center p-6 flex-1 w-full"
        >
          <div className="w-full mb-4">
            <Button
              title={"Logout"}
              onClick={onClickLogout}
              icon={<LogoutOutlined className="text-white text-sm" />}
            />
          </div>
          <Dropdown />
          {loading ? (
            <div className="flex flex-1 justify-center items-center w-full">
              <CircularProgress
                sx={{
                  color: "#F97316",
                }}
              />
            </div>
          ) : dogList.length > 0 ? (
            <DogList dogList={dogList} />
          ) : (
            <p>No dogs found</p>
          )}
          <Pagination
            count={Math.ceil(count / size)}
            page={currentPage}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBack, next: ArrowForward }}
                {...item}
              />
            )}
            onChange={handlePageChange}
            className="mt-4 mb-2"
          />
          <div className="w-full flex gap-4 justify-end">
            <Button
              title="Clear Match"
              onClick={onClickClearMatch}
              icon={null}
              disabled={!selectedDogList || selectedDogList.length === 0}
            />
            <Button
              title="Match"
              onClick={onClickMatch}
              icon={null}
              disabled={!selectedDogList || selectedDogList.length === 0}
            />
          </div>
        </div>

        {showMatchPopup && (
          <MatchPopup matchResult={matchResult} onClose={handleClosePopup} />
        )}
      </div>
      <Footer />
    </div>
  );
}
