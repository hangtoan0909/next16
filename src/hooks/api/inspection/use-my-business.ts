import { myBusinessAPI } from '@/api/services/inspection/my_business';
import { useAppMutation, useAppQuery } from '@/hooks/react-query';
import { InformationBusinessType, InspectionMyBusinessIntroductionPayloadType, OperationMyBusinessType } from '@/types';

export const useGetMyBusinessUnionAffiliation = () =>
  useAppQuery({
    queryKey: ['union_affiliation'],
    queryFn: myBusinessAPI.introduction.union_affiliation,
    gcTime: Infinity,
    staleTime: Infinity,
  });

export const useGetMyBusinessSpeciallizations = () =>
  useAppQuery({
    queryKey: ['speciallizations'],
    queryFn: myBusinessAPI.introduction.specializations,
    gcTime: Infinity,
    staleTime: Infinity,
  });

export const useGetMyBusinessIntroduction = () =>
  useAppQuery({
    queryKey: ['my_business_introduction'],
    queryFn: myBusinessAPI.introduction.get,
  });

export const useUpdateMyBusinessIntroduction = () =>
  useAppMutation((payload: InspectionMyBusinessIntroductionPayloadType) => myBusinessAPI.introduction.update(payload));

export const useGetMyBusinessInformation = () =>
  useAppQuery({
    queryKey: ['my_business_information'],
    queryFn: myBusinessAPI.information.get,
  });

export const useUpdateMyBusinessInformation = () =>
  useAppMutation((payload: InformationBusinessType) => myBusinessAPI.information.update(payload));

export const useGetMyBusinessOperation = () =>
  useAppQuery({
    queryKey: ['my_business_operation'],
    queryFn: myBusinessAPI.operation.get,
  });

export const useUpdateMyBusinessOperation = () =>
  useAppMutation((payload: OperationMyBusinessType) => myBusinessAPI.operation.update(payload));
